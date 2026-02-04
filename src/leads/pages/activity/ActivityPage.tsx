import { use } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { LucideFileText, LucideLoader2 } from "lucide-react";
import { AddActivity } from "../../components/AddActivity";
import { LeadsContext } from "../../context/LeadsContext";

import { CardActivity } from "./components/CardActivity";
import { SeachActivities } from "./components/SeachActivities";
import { useActivityFilters } from "@/leads/hooks/useActivityFilters";
import { useInfiniteScroll } from "@/leads/hooks/useInfiniteScroll";

export function ActivityPage() {
  const { leads } = use(LeadsContext);

  const {
    visibleActivities,
    totalFiltered,
    totalActivities,
    loadMore,
    hasMore,
  } = useActivityFilters();

  // Infinite scroll hook
  const sentinelRef = useInfiniteScroll({
    onLoadMore: loadMore,
    hasMore,
  });

  return (
    <div className="space-y-6">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-gray-600">
              View a stream of touchpoints, follow-ups, and changes to your
              leads.
            </p>
          </div>
          <AddActivity leads={leads} />
        </div>

        {/* Filters */}
        <SeachActivities leads={leads} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Timeline</CardTitle>
          <CardDescription>
            Showing {visibleActivities.length} of {totalFiltered}{" "}
            {totalFiltered === 1 ? "activity" : "activities"}
            {totalFiltered !== totalActivities &&
              ` (filtered from ${totalActivities})`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {totalFiltered === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <LucideFileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium">No activities found</p>
              <p className="text-sm mt-2">
                {totalActivities === 0
                  ? "Start by logging your first activity"
                  : "Try adjusting your filters"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {visibleActivities.map((activity) => (
                <CardActivity key={activity.id} activity={activity} />
              ))}

              {/* Infinite scroll sentinel */}
              {hasMore && (
                <div
                  ref={sentinelRef}
                  className="flex justify-center py-4 text-gray-500"
                >
                  <LucideLoader2 className="w-6 h-6 animate-spin" />
                  <span className="ml-2">Loading more activities...</span>
                </div>
              )}

              {/* End of list indicator */}
              {!hasMore && visibleActivities.length > 0 && (
                <div className="text-center py-4 text-gray-400 text-sm border-t">
                  You've reached the end of the timeline
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
