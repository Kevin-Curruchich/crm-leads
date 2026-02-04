import { use } from "react";
import { useNavigate } from "react-router";

import { LeadsContext } from "../../context/LeadsContext";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { AddNewLead } from "../../components/AddNewLead";
import { LeadsStats } from "./components/LeadsStats";
import { LeadsTable } from "./components/LeadsTable";
import { useLeadFilters } from "@/leads/hooks/useLeadFilters";

export function HomePage() {
  const navigate = useNavigate();
  const { leadsCount, newLeadsCount, qualifiedLeadsCount } = use(LeadsContext);
  const { paginatedLeads } = useLeadFilters({
    defaultPageSize: 2,
  });

  const navigateToLeadsList = () => {
    navigate("/leads/list");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-gray-600 mt-1">
              Manage and track your new clients
            </h3>
          </div>

          <AddNewLead />
        </div>

        <LeadsStats
          leadsCount={leadsCount}
          newLeadsCount={newLeadsCount}
          qualifiedLeadsCount={qualifiedLeadsCount}
        />

        {/* Leads Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              New Leads
              <Button
                size="sm"
                variant="secondary"
                onClick={navigateToLeadsList}
              >
                View All
              </Button>
            </CardTitle>
            <CardDescription>
              View and manage all your client leads
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <LeadsTable leads={paginatedLeads} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
