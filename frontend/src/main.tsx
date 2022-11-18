import ReactDOM from "react-dom/client";
import { createClient, dedupExchange, fetchExchange, makeOperation, Provider } from "urql";
import { authExchange } from "@urql/exchange-auth";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import App from "./App";
import "./index.css";
import { RefreshDocument, RefreshMutation } from "./generated/graphql";
import { snapshot } from "valtio";
import authStore from "~/stores/authStore";
import { decode } from "jsonwebtoken";

const client = createClient({
  url: "http://localhost:4000/graphql",
  exchanges: [
    dedupExchange,
    authExchange<{ access_token: string }>({
      addAuthToOperation: ({ authState, operation }) => {
        if (!authState) {
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
              Authorization: authState.access_token,
            },
          },
        });
      },
      willAuthError: ({ authState }) => {
        if (!authState) return false;
        const decoded = decode(authState.access_token) as { address: string; iat: number; exp: number };
        if (new Date() > new Date(decoded.exp * 1000)) {
          return true;
        }
        return false;
      },
      getAuth: async ({ authState, mutate }) => {
        const auth = snapshot(authStore);
        const address = window.ethereum?.selectedAddress ?? auth.address;
        if (!address) return null;
        auth.setAddress(address);

        const result = await mutate<RefreshMutation>(RefreshDocument, { address });
        const access_token = result.data?.refresh?.access_token ?? null;
        if (!access_token) {
          auth.setAccessToken(null);
          return null;
        }
        auth.setAccessToken(access_token);
        return {
          access_token,
        };
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
  <Provider value={client}>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </Provider>
);
