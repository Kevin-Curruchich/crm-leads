import { use, useEffect } from "react";
import { useSearchParams } from "react-router";

import { Badge } from "@/components/ui/badge";
import {
  KanbanProvider,
  KanbanBoard,
  KanbanHeader,
  KanbanCards,
} from "@/components/ui/shadcn-io/kanban";

import type { Lead } from "../../domain/lead.interfact";
import { leadStatusColumns } from "../../domain/lead-status-constants";
import { SearchLeads } from "../../components/SearchLeads";

import { KanbanLeadCard } from "./components/KanbanLeadCard";
import { useLeadFilters } from "@/leads/hooks/useLeadFilters";
import { LeadsContext } from "@/leads/context/LeadsContext";

export const KanbanPage = () => {
  const { setLeads } = use(LeadsContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    filteredLeads,

    totalPages,
    currentPage,
  } = useLeadFilters();

  // Reset to page 1 when filters change
  useEffect(() => {
    const hasFilters =
      searchParams.has("search") ||
      searchParams.has("status") ||
      searchParams.has("date");

    if (hasFilters && currentPage > totalPages && totalPages > 0) {
      setSearchParams((prev) => {
        prev.set("page", "1");
        return prev;
      });
    }
  }, [totalPages, currentPage, searchParams, setSearchParams]);

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
        data={filteredLeads}
        onDataChange={setLeads}
        className="h-[calc(100vh-200px)]"
      >
        {(column) => {
          return (
            <KanbanBoard id={column.id} key={column.id}>
              <KanbanHeader className="flex items-center justify-between">
                <span>{column.name}</span>
                <Badge variant="secondary">
                  {
                    filteredLeads.filter((lead) => lead.column === column.id)
                      .length
                  }
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
