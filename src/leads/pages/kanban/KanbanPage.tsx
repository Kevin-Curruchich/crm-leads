import { use } from "react";

import { Badge } from "@/components/ui/badge";
import {
  KanbanProvider,
  KanbanBoard,
  KanbanHeader,
  KanbanCards,
} from "@/components/ui/shadcn-io/kanban";

import { LeadsContext } from "../../context/LeadsContext";

import type { Lead } from "../../domain/lead.interfact";
import { leadStatusColumns } from "../../domain/lead-status-constants";
import { SearchLeads } from "../../components/SearchLeads";

import { KanbanLeadCard } from "./components/KanbanLeadCard";

export const KanbanPage = () => {
  const { leads, setLeads } = use(LeadsContext);

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <p className="text-gray-600 ">
          Drag and drop leads to update their status
        </p>
      </div>

      <SearchLeads />

      {/* Kanban Board */}
      <KanbanProvider
        columns={leadStatusColumns}
        data={leads}
        onDataChange={setLeads}
        className="h-[calc(100vh-200px)]"
      >
        {(column) => {
          return (
            <KanbanBoard id={column.id} key={column.id}>
              <KanbanHeader className="flex items-center justify-between">
                <span>{column.name}</span>
                <Badge variant="secondary">
                  {leads.filter((lead) => lead.column === column.id).length}
                </Badge>
              </KanbanHeader>
              <KanbanCards id={column.id}>
                {(lead: Lead) => <KanbanLeadCard lead={lead} key={lead.id} />}
              </KanbanCards>
            </KanbanBoard>
          );
        }}
      </KanbanProvider>
    </div>
  );
};

export default KanbanPage;
