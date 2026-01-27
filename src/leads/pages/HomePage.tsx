import { use, useState } from "react";

import { AddNewLead } from "../components/AddNewLead";
import { LeadsContext } from "../context/LeadsContext";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LucideEdit3, LucideTrash } from "lucide-react";
import { statusColors } from "../domain/lead-status-constants";
import type { Lead } from "../domain/lead.interfact";

export default function LeadsListPage() {
  const { leads, leadsCount, newLeadsCount, deleteLead } = use(LeadsContext);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [leadToEdit, setLeadToEdit] = useState<any>(null);

  const handleDeleteClick = (leadId: string, leadName: string) => {
    setLeadToDelete({ id: leadId, name: leadName });
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (leadToDelete) {
      deleteLead(leadToDelete.id);
      setDeleteDialogOpen(false);
      setLeadToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setLeadToDelete(null);
  };

  const handleEditClick = (lead: Lead) => {
    setLeadToEdit(lead);
    setEditDialogOpen(true);
  };

  const handleEditOpenChange = (open: boolean) => {
    setEditDialogOpen(open);
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

          <AddNewLead
            lead={leadToEdit}
            open={editDialogOpen}
            onOpenChange={handleEditOpenChange}
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{leadsCount}</div>
              <p className="text-xs text-gray-500 mt-2">All-time leads</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                New
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {newLeadsCount}
              </div>
              <p className="text-xs text-gray-500 mt-2">Awaiting contact</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Qualified
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">1</div>
              <p className="text-xs text-gray-500 mt-2">Ready for next step</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <Input
            type="text"
            placeholder="Search by name or email..."
            className="flex-1"
          />
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
            </SelectContent>
          </Select>
        </div>

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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
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
                      <TableCell>{lead.email}</TableCell>
                      <TableCell>{lead.phone}</TableCell>
                      <TableCell>{lead.company}</TableCell>
                      <TableCell>
                        <Badge className={statusColors[lead.status]}>
                          {lead.status}
                        </Badge>
                      </TableCell>
                      <TableCell> {lead.dateAdded} </TableCell>
                      <TableCell className="text-right">
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
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the lead{" "}
              <strong>{leadToDelete?.name}</strong>? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelDelete}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
