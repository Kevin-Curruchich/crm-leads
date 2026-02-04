import { RouterProvider } from "react-router";
import { appRoute } from "./router/app.router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { LeadsProvider } from "./leads/context/LeadsContext";
import { ActivityProvider } from "./leads/context/ActivityContext";

const queryClient = new QueryClient();

const CrmLeadsApp = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LeadsProvider>
          <ActivityProvider>
            <RouterProvider router={appRoute} />
            <ReactQueryDevtools initialIsOpen={true} />
          </ActivityProvider>
        </LeadsProvider>
      </QueryClientProvider>
    </>
  );
};

export default CrmLeadsApp;
