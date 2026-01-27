import { use } from "react";
import { Badge } from "@/components/ui/badge";

import {
  KanbanProvider,
  KanbanBoard,
  KanbanHeader,
  KanbanCards,
  KanbanCard,
} from "@/components/ui/shadcn-io/kanban";
import { LucidePhone, LucideMail, LucideBuilding2 } from "lucide-react";

import { LeadsContext } from "../context/LeadsContext";
import type { Lead } from "../domain/lead.interfact";
import { leadStatusColumns } from "../domain/lead-status-constants";
import { SearchLeads } from "../components/SearchLeads";

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
          const columnConfig = leadStatusColumns.find(
            (c) => c.id === column.id,
          );
          return (
            <KanbanBoard id={column.id} key={column.id}>
              <KanbanHeader className="flex items-center justify-between">
                <span>{column.name}</span>
                <Badge variant="secondary" className="ml-2">
                  {leads.filter((l) => l.column === column.id).length}
                </Badge>
              </KanbanHeader>
              <KanbanCards id={column.id}>
                {(lead: Lead) => (
                  <KanbanCard
                    key={lead.id}
                    id={lead.id}
                    name={lead.name}
                    column={lead.column}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-sm">{lead.name}</h3>
                        <Badge
                          className={columnConfig?.color}
                          variant="secondary"
                        >
                          {columnConfig?.name}
                        </Badge>
                      </div>

                      <div className="space-y-1.5 text-xs text-gray-600">
                        <div className="flex items-center gap-2">
                          <LucideBuilding2 className="w-3 h-3" />
                          <span>{lead.company as string}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <LucideMail className="w-3 h-3" />
                          <span className="truncate">
                            {lead.email as string}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <LucidePhone className="w-3 h-3" />
                          <span>{lead.phone as string}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t text-xs text-gray-500">
                        Added: {lead.dateAdded}
                      </div>
                    </div>
                  </KanbanCard>
                )}
              </KanbanCards>
            </KanbanBoard>
          );
        }}
      </KanbanProvider>
    </div>
  );
};

export default KanbanPage;
