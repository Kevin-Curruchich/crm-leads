import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import CrmLeadsApp from "./CrmLeadsApp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CrmLeadsApp />
  </StrictMode>
);
