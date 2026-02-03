import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { LucideFileText, LucideEdit3, LucideTrash } from "lucide-react";

import { statusColors } from "@/leads/domain/lead-status-constants";
import { formatRelativeDate } from "@/lib/date.utils";
import type { Lead } from "@/leads/domain/lead.interfact";
import { useSearchParams } from "react-router";
import { DeleteLead } from "@/leads/components/DeleteLead";
import { Badge } from "@/components/ui/badge";

interface Props {
  leads: Lead[];
}

export const LeadsTable = ({ leads }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleDeleteClick = (leadId: string, leadName: string) => {
    searchParams.set("deleteLead", "true");
    searchParams.set("leadId", leadId);
    searchParams.set("leadName", leadName);
    setSearchParams(searchParams);
  };

  const handleEditClick = (lead: Lead) => {
    setSearchParams((prevParams) => {
      prevParams.set("leadModalOpen", "true");
      prevParams.set("leadId", lead.id);
      return prevParams;
    });
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Added</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell className="font-medium">{lead.name}</TableCell>
              <TableCell className="font-medium">{lead.lastName}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.phone}</TableCell>
              <TableCell>{lead.company}</TableCell>
              <TableCell>
                <Badge className={statusColors[lead.status]}>
                  {lead.status}
                </Badge>
              </TableCell>
              <TableCell> {formatRelativeDate(lead.dateAdded)} </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  className="mr-2"
                  title="Log activity"
                >
                  <LucideFileText />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="mr-2"
                  onClick={() => handleEditClick(lead)}
                >
                  <LucideEdit3 />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteClick(lead.id, lead.name)}
                >
                  <LucideTrash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Delete Confirmation Dialog */}
      <DeleteLead />
    </>
  );
};
