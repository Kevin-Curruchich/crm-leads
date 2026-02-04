import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LucideSearch, LucideX } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { activityTypes } from "@/leads/domain/activity.constant";
import type { Lead } from "@/leads/domain/lead.interfact";
import { useSearchParams } from "react-router";

interface Props {
  leads: Lead[];
}

export const SeachActivities = ({ leads }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";
  const filterType = searchParams.get("type") || "all";
  const filterLead = searchParams.get("lead") || "all";

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => {
      if (e.target.value.trim()) {
        prev.set("search", e.target.value);
      } else {
        prev.delete("search");
      }
      return prev;
    });
  };

  const handleTypeChange = (value: string) => {
    setSearchParams((prev) => {
      if (value === "all") {
        prev.delete("type");
      } else {
        prev.set("type", value);
      }
      return prev;
    });
  };

  const handleLeadChange = (value: string) => {
    setSearchParams((prev) => {
      if (value === "all") {
        prev.delete("lead");
      } else {
        prev.set("lead", value);
      }
      return prev;
    });
  };

  const handleClearFilters = () => {
    setSearchParams((prev) => {
      prev.delete("search");
      prev.delete("type");
      prev.delete("lead");
      return prev;
    });
  };

  const hasActiveFilters =
    searchQuery || filterType !== "all" || filterLead !== "all";

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Search activities */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Activities
          </label>
          <div className="relative">
            <LucideSearch className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by title, description, or lead name..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Filter by activity type */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Activity Type
          </label>
          <Select value={filterType} onValueChange={handleTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {activityTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filter by lead */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Lead
          </label>
          <Select value={filterLead} onValueChange={handleLeadChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Leads" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Leads</SelectItem>
              {leads.map((lead) => (
                <SelectItem key={lead.id} value={lead.id}>
                  {lead.name} {lead.lastName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Clear filters button */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="icon"
            onClick={handleClearFilters}
            title="Clear all filters"
            className="self-end"
          >
            <LucideX className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
