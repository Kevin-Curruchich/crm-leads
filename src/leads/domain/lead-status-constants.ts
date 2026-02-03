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

export const LEAD_STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: LeadStatus.NEW, label: "New" },
  { value: LeadStatus.CONTACTED, label: "Contacted" },
  { value: LeadStatus.QUALIFIED, label: "Qualified" },
  { value: LeadStatus.PROPOSAL_SENT, label: "Proposal Sent" },
  { value: LeadStatus.WON, label: "Won" },
  { value: LeadStatus.LOST, label: "Lost" },
];

export const statusColors: Record<string, string> = {
  NEW: "bg-yellow-100 text-yellow-800",
  CONTACTED: "bg-orange-100 text-yellow-800",
  QUALIFIED: "bg-green-100 text-green-800",
  PROPOSAL_SENT: "bg-indigo-100 text-indigo-800",
  WON: "bg-green-100 text-green-800",
  LOST: "bg-red-100 text-red-800",
};
