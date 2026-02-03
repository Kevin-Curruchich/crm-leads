import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LucideSearch, LucideX } from "lucide-react";
import { useSearchParams } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LEAD_STATUS_OPTIONS } from "../domain/lead-status-constants";

export const SearchLeads = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("search") || "";
  const dateFilter = searchParams.get("date") || "";
  const statusFilter = searchParams.get("status") || "all";

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Search by name */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search by Name
          </label>
          <div className="relative">
            <LucideSearch className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              value={searchTerm}
              placeholder="Search leads by name..."
              className="pl-10"
              defaultValue={searchTerm}
              onChange={(e) => {
                setSearchParams((prev) => {
                  prev.set("search", e.target.value);
                  return prev;
                });
              }}
            />
          </div>
        </div>

        {/* Filter by date added */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Date Added
          </label>
          <Input
            type="date"
            placeholder="Filter by date added"
            value={dateFilter}
            onChange={(e) => {
              setSearchParams((prev) => {
                prev.set("date", e.target.value);
                return prev;
              });
            }}
          />
        </div>

        {/* Filter by status */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Status
          </label>
          <Select
            defaultValue={statusFilter}
            onValueChange={(value) => {
              setSearchParams((prev) => {
                prev.set("status", value);
                return prev;
              });
            }}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {LEAD_STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Clear button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setSearchParams((prev) => {
              prev.delete("search");
              prev.delete("date");
              prev.delete("status");
              return prev;
            });
          }}
          title="Clear filters"
        >
          <LucideX className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
