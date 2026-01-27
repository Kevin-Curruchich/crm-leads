export const LeadStatus = {
  NEW: "NEW",
  CONTACTED: "CONTACTED",
  QUALIFIED: "QUALIFIED",
  LOST: "LOST",
  WON: "WON",
  PROPOSAL_SENT: "PROPOSAL_SENT",
} as const;

export type LeadStatus = (typeof LeadStatus)[keyof typeof LeadStatus];

export interface LeadStatusColumn extends Record<string, unknown> {
  id: LeadStatus;
  name: string;
  color: string;
}
