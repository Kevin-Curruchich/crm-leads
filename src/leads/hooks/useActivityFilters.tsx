import { use, useMemo, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router";
import { ActivityContext } from "../context/ActivityContext";
import { parseDate } from "@/lib/date.utils";

const ITEMS_PER_PAGE = 10;

export const useActivityFilters = () => {
  const [searchParams] = useSearchParams();
  const { activities } = use(ActivityContext);

  // Get filter values from URL params
  const search = searchParams.get("search") || "";
  const type = searchParams.get("type") || "all";
  const leadId = searchParams.get("lead") || "all";

  // Track how many items to display (for infinite scroll)
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [search, type, leadId]);

  // Filter activities based on search, type, and lead
  const filteredActivities = useMemo(() => {
    let filtered = [...activities];

    // Filter by search term (title or description)
    if (search.trim() !== "") {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (activity) =>
          activity.title.toLowerCase().includes(searchLower) ||
          activity.description.toLowerCase().includes(searchLower) ||
          activity.leadName.toLowerCase().includes(searchLower),
      );
    }

    // Filter by activity type
    if (type !== "all") {
      filtered = filtered.filter((activity) => activity.type === type);
    }

    // Filter by lead
    if (leadId !== "all") {
      filtered = filtered.filter((activity) => activity.leadId === leadId);
    }

    // Sort by dateCreated (most recent first)
    filtered.sort((a, b) => {
      return parseDate(b.dateCreated).diff(parseDate(a.dateCreated));
    });

    return filtered;
  }, [activities, search, type, leadId]);

  // Get visible activities (for infinite scroll)
  const visibleActivities = useMemo(() => {
    return filteredActivities.slice(0, displayCount);
  }, [filteredActivities, displayCount]);

  // Load more items
  const loadMore = useCallback(() => {
    setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
  }, []);

  // Check if there are more items to load
  const hasMore = displayCount < filteredActivities.length;

  return {
    // Visible activities (for display)
    visibleActivities,

    // All filtered activities (for count)
    filteredActivities,

    // Counts
    totalFiltered: filteredActivities.length,
    totalActivities: activities.length,
    displayCount,

    // Infinite scroll controls
    loadMore,
    hasMore,

    // Current filters (for display/debugging)
    filters: {
      search,
      type,
      leadId,
    },
  };
};
