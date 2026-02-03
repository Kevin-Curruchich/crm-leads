import { use, useMemo, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatRelativeDate } from "@/lib/date.utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LucidePhone,
  LucideMail,
  LucideFileText,
  LucideCalendar,
  LucideRefreshCw,
} from "lucide-react";
import { AddActivity } from "../components/AddActivity";
import { LeadsContext } from "../context/LeadsContext";
import type { Activity } from "../domain/activity.interface";
import { activityColors } from "../domain/activity.constant";
import { useSearchParams } from "react-router";

// Mock activity data - TODO: Replace with real data from context
const mockActivities: Activity[] = [
  {
    id: "1",
    leadId: "lead-1",
    leadName: "John Doe",
    type: "CALL",
    title: "Initial contact call",
    description:
      "Discussed product requirements and budget. Very interested in our enterprise plan.",
    dateCreated: "2026-01-26T10:30:00Z",
    createdBy: "You",
  },
  {
    id: "2",
    leadId: "lead-2",
    leadName: "Jane Smith",
    type: "EMAIL",
    title: "Sent pricing proposal",
    description:
      "Emailed detailed pricing breakdown for the annual subscription.",
    dateCreated: "2026-01-25T15:45:00Z",
    createdBy: "You",
  },
  {
    id: "3",
    leadId: "lead-1",
    leadName: "John Doe",
    type: "MEETING",
    title: "Product demo scheduled",
    description: "Scheduled a 30-minute demo for next Tuesday at 2 PM.",
    dateCreated: "2026-01-25T09:15:00Z",
    createdBy: "You",
  },
  {
    id: "4",
    leadId: "lead-3",
    leadName: "Bob Johnson",
    type: "STATUS_CHANGE",
    title: "Status updated to Qualified",
    description:
      "Lead moved from Contacted to Qualified after successful follow-up.",
    dateCreated: "2026-01-24T14:20:00Z",
    createdBy: "System",
  },
  {
    id: "5",
    leadId: "lead-2",
    leadName: "Jane Smith",
    type: "NOTE",
    title: "Competitor evaluation",
    description:
      "Lead is currently evaluating 2 other solutions. Need to follow up next week.",
    dateCreated: "2026-01-24T11:00:00Z",
    createdBy: "You",
  },
];

export const activityIcons = {
  CALL: <LucidePhone className="w-4 h-4" />,
  EMAIL: <LucideMail className="w-4 h-4" />,
  NOTE: <LucideFileText className="w-4 h-4" />,
  MEETING: <LucideCalendar className="w-4 h-4" />,
  STATUS_CHANGE: <LucideRefreshCw className="w-4 h-4" />,
};

export default function ActivityPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { leads } = use(LeadsContext);

  const searchQuery = searchParams.get("search") || "";
  const filterType = searchParams.get("type") || "all";
  const filterLead = searchParams.get("lead") || "all";

  const searchRef = useRef<HTMLInputElement>(null);

  // TODO: Replace with real activities from context
  const activities = mockActivities;

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.leadName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === "all" || activity.type === filterType;
    const matchesLead = filterLead === "all" || activity.leadId === filterLead;

    return matchesSearch && matchesType && matchesLead;
  });

  const setQueryParams = (name: string, value: string) => {
    searchParams.set(name, value);
    setSearchParams(searchParams);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const query = searchRef.current?.value || "";

      setQueryParams("search", query);
    }
  };

  const handleTypeChange = (value: string) => {
    setQueryParams("type", value);
  };

  const handleLeadChange = (value: string) => {
    setQueryParams("lead", value);
  };

  const leadOptions = useMemo(() => {
    return leads.map((lead) => ({
      id: lead.id,
      name: lead.name,
    }));
  }, [leads]);

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
          <AddActivity leads={leadOptions} />
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <Input
            ref={searchRef}
            type="text"
            placeholder="Search activities..."
            className="flex-1"
            defaultValue={searchQuery}
            onKeyDown={handleKeyDown}
          />
          <Select value={filterType} onValueChange={handleTypeChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Activity type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="CALL">Calls</SelectItem>
              <SelectItem value="EMAIL">Emails</SelectItem>
              <SelectItem value="MEETING">Meetings</SelectItem>
              <SelectItem value="NOTE">Notes</SelectItem>
              <SelectItem value="STATUS_CHANGE">Status Changes</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterLead} onValueChange={handleLeadChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by lead" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Leads</SelectItem>
              {leads.map((lead) => (
                <SelectItem key={lead.id} value={lead.id}>
                  {lead.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Timeline</CardTitle>
          <CardDescription>
            {filteredActivities.length}{" "}
            {filteredActivities.length === 1 ? "activity" : "activities"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredActivities.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <LucideFileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium">No activities found</p>
              <p className="text-sm mt-2">
                {searchQuery || filterType !== "all" || filterLead !== "all"
                  ? "Try adjusting your filters"
                  : "Start by logging your first activity"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="relative pl-8 pb-8 border-l-2 border-gray-200 last:border-0 last:pb-0"
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full border-2 ${activityColors[activity.type]}`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-[8px]">
                      {activityIcons[activity.type]}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant="outline"
                            className={activityColors[activity.type]}
                          >
                            {activity.type.replace("_", " ")}
                          </Badge>
                          <span className="text-sm font-medium text-gray-900">
                            {activity.leadName}
                          </span>
                        </div>
                        <h3 className="font-semibold text-base text-gray-900">
                          {activity.title}
                        </h3>
                      </div>
                      <time className="text-xs text-gray-500 whitespace-nowrap ml-4">
                        {formatRelativeDate(activity.dateCreated)}
                      </time>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {activity.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>By {activity.createdBy}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
