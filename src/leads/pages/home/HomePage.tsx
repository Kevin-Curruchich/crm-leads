import { use } from "react";

import { AddNewLead } from "../../components/AddNewLead";
import { LeadsContext } from "../../context/LeadsContext";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { LeadsStats } from "./components/LeadsStats";
import { SearchLeads } from "@/leads/components/SearchLeads";
import { LeadsTable } from "./components/LeadsTable";

export default function LeadsListPage() {
  const { leads, leadsCount, newLeadsCount } = use(LeadsContext);

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

        <LeadsStats leadsCount={leadsCount} newLeadsCount={newLeadsCount} />

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
              <LeadsTable leads={leads} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
