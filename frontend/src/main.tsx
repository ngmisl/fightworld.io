import React from "react";
import ReactDOM from "react-dom/client";
import { cacheExchange, createClient, dedupExchange, fetchExchange, makeOperation, Provider } from "urql";
import { authExchange } from "@urql/exchange-auth";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import App from "./App";
import "./index.css";
import { RefreshDocument, RefreshMutation } from "./generated/graphql";
import { snapshot } from "valtio";
import authStore from "~/authStore";

const client = createClient({
  url: "http://localhost:4000/graphql",
  exchanges: [
    dedupExchange,
    cacheExchange,
    authExchange<{ access_token: string }>({
      addAuthToOperation: ({ operation }) => {
        const auth = snapshot(authStore);
        if (!auth.accessToken) {
          return operation;
        }

        const fetchOptions =
          typeof operation.context.fetchOptions === "function"
            ? operation.context.fetchOptions()
            : operation.context.fetchOptions || {};

        return makeOperation(operation.kind, operation, {
          ...operation.context,
          fetchOptions: {
            ...fetchOptions,
            headers: {
              ...fetchOptions.headers,
              Authorization: auth.accessToken,
            },
          },
        });
      },
      getAuth: async ({ mutate }) => {
        const auth = snapshot(authStore);
        const address = window.ethereum?.selectedAddress ?? auth.address;
        if (!address) return null;
        auth.setAddress(address);

        if (!auth.accessToken) {
          const result = await mutate<RefreshMutation>(RefreshDocument, { address });
          const access_token = result.data?.refresh?.access_token ?? null;
          if (!access_token) return null;
          auth.setAccessToken(access_token);
          return {
            access_token,
          };
        }
        return null;
      },
    }),
    fetchExchange,
  ],
  fetchOptions: () => ({
    credentials: "include",
  }),
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider value={client}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
