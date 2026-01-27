import { LeadStatus, type LeadStatusColumn } from "./lead-status.type";

export const leadStatusColumns: LeadStatusColumn[] = [
  {
    id: LeadStatus.NEW,
    name: "New",
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: LeadStatus.CONTACTED,
    name: "Contacted",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    id: LeadStatus.QUALIFIED,
    name: "Qualified",
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: LeadStatus.PROPOSAL_SENT,
    name: "Proposal Sent",
    color: "bg-indigo-100 text-indigo-800",
  },
  {
    id: LeadStatus.WON,
    name: "Won",
    color: "bg-green-100 text-green-800",
  },
  {
    id: LeadStatus.LOST,
    name: "Lost",
    color: "bg-red-100 text-red-800",
  },
];

export const statusColors: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-800",
  CONTACTED: "bg-yellow-100 text-yellow-800",
  QUALIFIED: "bg-green-100 text-green-800",
  PROPOSAL_SENT: "bg-indigo-100 text-indigo-800",
  WON: "bg-green-100 text-green-800",
  LOST: "bg-red-100 text-red-800",
};
