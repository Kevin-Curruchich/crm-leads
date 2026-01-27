import { LeadsLayout } from "@/leads/layouts/LeadsLayout";
import LeadsListPage from "@/leads/pages/HomePage";
import KanbanPage from "@/leads/pages/KanbanPage";
import ActivityPage from "@/leads/pages/ActivityPage";
import { createBrowserRouter, Navigate } from "react-router";
import LeadPage from "@/leads/pages/LeadPage";

export const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/leads" replace />,
  },
  {
    path: "leads",
    element: <LeadsLayout />,
    children: [
      {
        index: true,
        element: <LeadsListPage />,
      },
      {
        path: "kanban",
        element: <KanbanPage />,
      },
      {
        path: "activity",
        element: <ActivityPage />,
      },
      {
        path: ":leadId",
        element: <LeadPage />,
      },
    ],
  },
]);
