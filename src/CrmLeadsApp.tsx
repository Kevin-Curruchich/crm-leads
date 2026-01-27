import { RouterProvider } from "react-router";
import { appRoute } from "./router/app.router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { LeadsProvider } from "./leads/context/LeadsContext";

const queryClient = new QueryClient();

const CrmLeadsApp = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LeadsProvider>
          <RouterProvider router={appRoute} />
          <ReactQueryDevtools initialIsOpen={true} />
        </LeadsProvider>
      </QueryClientProvider>
    </>
  );
};

export default CrmLeadsApp;
