import { createBrowserRouter, Navigate } from "react-router";

import { LeadsLayout } from "@/leads/layouts/LeadsLayout";
import { HomePage } from "@/leads/pages/home/HomePage";
import { KanbanPage } from "@/leads/pages/kanban/KanbanPage";
import { ActivityPage } from "@/leads/pages/activity/ActivityPage";
import { LeadPage } from "@/leads/pages/LeadPage";
import { LeadsList } from "@/leads/pages/table/LeadsList";

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
        element: <HomePage />,
      },
      {
        path: "list",
        element: <LeadsList />,
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
