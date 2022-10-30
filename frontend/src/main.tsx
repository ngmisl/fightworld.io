import React from "react";
import ReactDOM from "react-dom/client";
import { cacheExchange, createClient, dedupExchange, fetchExchange, Provider } from "urql";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

const client = createClient({
  url: "http://localhost:4000/graphql",
  exchanges: [dedupExchange, cacheExchange, fetchExchange],
  fetchOptions: () => ({
    credentials: 'include',
 })
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider value={client}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
          <ReactQueryDevtools />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
