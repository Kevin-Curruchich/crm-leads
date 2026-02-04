import { use, useMemo } from "react";
import { useSearchParams } from "react-router";
import { LeadsContext } from "../context/LeadsContext";
import { parseDate } from "@/lib/date.utils";

const DEFAULT_PAGE_SIZE = 5;

interface Props {
  defaultPageSize?: number;
}

export const useLeadFilters = ({
  defaultPageSize = DEFAULT_PAGE_SIZE,
}: Props = {}) => {
  const [searchParams] = useSearchParams();
  const { leads, leadsCount } = use(LeadsContext);

  // Get filter values from URL params
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "all";
  const date = searchParams.get("date") || "";
  const currentPage = Number(searchParams.get("page")) || 1;

  // Filter leads based on search, status, and date
  const filteredLeads = useMemo(() => {
    let filtered = [...leads];

    // Filter by search term (name, lastName, email, or company)
    if (search.trim() !== "") {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchLower) ||
          lead.lastName.toLowerCase().includes(searchLower) ||
          lead.email.toLowerCase().includes(searchLower) ||
          lead.company.toLowerCase().includes(searchLower),
      );
    }

    // Filter by status
    if (status !== "all") {
      filtered = filtered.filter((lead) => lead.status === status);
    }

    // Filter by date
    if (date.trim() !== "") {
      const filterDate = parseDate(date);
      filtered = filtered.filter((lead) => {
        const leadDate = parseDate(lead.dateAdded);
        return leadDate.isSame(filterDate, "day");
      });
    }

    // Sort by dateAdded (most recent first)
    filtered.sort((a, b) => {
      return parseDate(b.dateAdded).diff(parseDate(a.dateAdded));
    });

    return filtered;
  }, [leads, search, status, date]);

  // Calculate pagination
  const totalFiltered = filteredLeads.length;
  const totalPages = Math.ceil(totalFiltered / defaultPageSize);
  const startIndex = (currentPage - 1) * defaultPageSize;
  const endIndex = startIndex + defaultPageSize;

  // Get paginated slice
  const paginatedLeads = useMemo(() => {
    return filteredLeads.slice(startIndex, endIndex);
  }, [filteredLeads, currentPage]);

  return {
    // Filtered and paginated data
    paginatedLeads,
    filteredLeads,

    // Counts
    totalFiltered,
    totalPages,
    totalLeads: leadsCount,

    // Current state
    currentPage,
    pageSize: defaultPageSize,

    // Current filters (for display/debugging)
    filters: {
      search,
      status,
      date,
    },
  };
};
