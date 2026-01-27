import type { LeadStatus } from "./lead-status.type";

export interface Lead extends Record<string, unknown> {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  dateAdded: string;
  status: LeadStatus;
  column: LeadStatus;
}
