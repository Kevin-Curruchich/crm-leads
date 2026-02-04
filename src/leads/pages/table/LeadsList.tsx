import { useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useLeadFilters } from "@/leads/hooks/useLeadFilters";

import { SearchLeads } from "@/leads/components/SearchLeads";

import { CustomPagination } from "@/components/custom/CustomPagination";
import { LeadsTable } from "../home/components/LeadsTable";
import { useSearchParams } from "react-router";

export const LeadsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    paginatedLeads,
    totalFiltered,
    totalPages,
    currentPage,
    pageSize,
    totalLeads,
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

  const showingStart =
    totalFiltered === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const showingEnd = Math.min(currentPage * pageSize, totalFiltered);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-gray-600 mt-1">
              Showing {showingStart}-{showingEnd} of {totalFiltered} leads
              {totalFiltered !== totalLeads && ` (filtered from ${totalLeads})`}
            </h3>
          </div>
        </div>

        <SearchLeads />

        {/* Leads Table */}
        <Card>
          <CardHeader>
            <CardTitle>New Leads</CardTitle>
            <CardDescription>
              View and manage all your client leads
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <LeadsTable leads={paginatedLeads} />
            </div>
          </CardContent>
          <CardFooter>
            <CustomPagination totalPages={totalPages} />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
