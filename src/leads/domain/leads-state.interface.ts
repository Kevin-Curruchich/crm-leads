import type { Lead } from "./lead.interfact";

export interface LeadsState {
  leads: Lead[];
  leadsCount: number;
  newLeadsCount: number;
  qualifiedLeadsCount: number;
}
