import { use } from "react";
import { LeadsContext } from "../context/LeadsContext";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LucideArrowLeft,
  LucideBuilding2,
  LucideCalendar,
  LucideEdit3,
  LucideMail,
  LucidePhone,
  LucideUser,
} from "lucide-react";
import { useParams } from "react-router";

const statusColors: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-800",
  CONTACTED: "bg-yellow-100 text-yellow-800",
  QUALIFIED: "bg-green-100 text-green-800",
  PROPOSAL_SENT: "bg-purple-100 text-purple-800",
  WON: "bg-emerald-100 text-emerald-800",
  LOST: "bg-red-100 text-red-800",
};

// Mock activity data structure - will be replaced with real data later
const mockActivities = [
  {
    id: "1",
    type: "email",
    title: "Email sent",
    description: "Sent initial contact email",
    date: "2026-01-18",
    time: "10:30 AM",
  },
  {
    id: "2",
    type: "call",
    title: "Phone call",
    description: "Discussed project requirements",
    date: "2026-01-17",
    time: "2:15 PM",
  },
  {
    id: "3",
    type: "note",
    title: "Note added",
    description: "Interested in enterprise package",
    date: "2026-01-16",
    time: "11:45 AM",
  },
  {
    id: "4",
    type: "status_change",
    title: "Status changed",
    description: "Changed from NEW to CONTACTED",
    date: "2026-01-15",
    time: "9:00 AM",
  },
];

const activityTypeColors: Record<string, string> = {
  email: "bg-blue-50 text-blue-700 border-blue-200",
  call: "bg-green-50 text-green-700 border-green-200",
  note: "bg-yellow-50 text-yellow-700 border-yellow-200",
  status_change: "bg-purple-50 text-purple-700 border-purple-200",
};

export default function LeadPage() {
  const { leadId } = useParams<{ leadId: string }>();
  const { leads } = use(LeadsContext);

  const lead = leads.find((l) => l.id === leadId);

  if (!lead) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Lead Not Found</CardTitle>
            <CardDescription>
              The lead you're looking for doesn't exist.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <LucideArrowLeft className="mr-2 h-4 w-4" />
              Back to Leads
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <LucideArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900">
                  {lead.name} {lead.lastName}
                </h1>
                <Badge className={statusColors[lead.status]}>
                  {lead.status}
                </Badge>
              </div>
              <p className="text-gray-600 mt-1">{lead.company}</p>
            </div>
          </div>
          <Button>
            <LucideEdit3 className="mr-2 h-4 w-4" />
            Edit Lead
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Lead Details */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <LucideUser className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Name</p>
                    <p className="text-sm text-gray-900">
                      {lead.name} {lead.lastName}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <LucideMail className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Email</p>
                    <p className="text-sm text-gray-900">{lead.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <LucidePhone className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Phone</p>
                    <p className="text-sm text-gray-900">{lead.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <LucideBuilding2 className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Company</p>
                    <p className="text-sm text-gray-900">{lead.company}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <LucideCalendar className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Date Added
                    </p>
                    <p className="text-sm text-gray-900">{lead.dateAdded}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lead Status */}
            <Card>
              <CardHeader>
                <CardTitle>Lead Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      Current Status
                    </p>
                    <Badge className={`${statusColors[lead.status]} text-base`}>
                      {lead.status}
                    </Badge>
                  </div>
                  <div className="pt-3 border-t">
                    <Button variant="outline" className="w-full">
                      Change Status
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <LucideMail className="mr-2 h-4 w-4" />
                  Send Email
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <LucidePhone className="mr-2 h-4 w-4" />
                  Make Call
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <LucideCalendar className="mr-2 h-4 w-4" />
                  Schedule Meeting
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Activity Timeline */}
          <div className="lg:col-span-2 space-y-6">
            {/* Activity Timeline */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Activity Timeline</CardTitle>
                    <CardDescription>
                      All interactions and updates for this lead
                    </CardDescription>
                  </div>
                  <Button>Add Activity</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex gap-4 pb-4 border-b last:border-b-0 last:pb-0"
                    >
                      <div className="flex-shrink-0">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                            activityTypeColors[activity.type]
                          }`}
                        >
                          {activity.type === "email" && (
                            <LucideMail className="h-4 w-4" />
                          )}
                          {activity.type === "call" && (
                            <LucidePhone className="h-4 w-4" />
                          )}
                          {activity.type === "note" && (
                            <LucideEdit3 className="h-4 w-4" />
                          )}
                          {activity.type === "status_change" && (
                            <LucideCalendar className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {activity.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {activity.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">
                              {activity.date}
                            </p>
                            <p className="text-xs text-gray-400">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notes Section */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Notes</CardTitle>
                    <CardDescription>
                      Internal notes about this lead
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    Add Note
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      Initial contact made. Client is interested in our
                      enterprise solution. Follow up needed within 3 days.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Added on Jan 18, 2026 at 3:45 PM
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      Budget range: $50k-$100k. Decision makers: CEO and CTO.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Added on Jan 15, 2026 at 10:20 AM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lead History */}
            <Card>
              <CardHeader>
                <CardTitle>Lead History</CardTitle>
                <CardDescription>Status changes and milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Previous Status</TableHead>
                      <TableHead>New Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>2026-01-18</TableCell>
                      <TableCell>Status Updated</TableCell>
                      <TableCell>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          CONTACTED
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          QUALIFIED
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2026-01-15</TableCell>
                      <TableCell>Status Updated</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-800">NEW</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          CONTACTED
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2026-01-14</TableCell>
                      <TableCell>Lead Created</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-800">NEW</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
