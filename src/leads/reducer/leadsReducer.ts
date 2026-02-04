import { LeadStatus } from "../domain/lead-status.type";
import type { Lead } from "../domain/lead.interfact";
import type { LeadsState } from "../domain/leads-state.interface";
import { nowISO } from "@/lib/date.utils";

export type LeadsAction =
  | { type: "ADD_LEAD"; payload: Omit<Lead, "id" | "dateAdded" | "column"> }
  | { type: "DELETE_LEAD"; payload: { id: string } }
  | {
      type: "UPDATE_LEAD";
      payload: {
        id: string;
        leadData: Partial<Lead> & { status?: LeadStatus };
      };
    }
  | { type: "SET_LEADS"; payload: Lead[] }
  | { type: "DELETE_LEAD"; payload: string };

export const leadsReducer = (
  state: LeadsState,
  action: LeadsAction,
): LeadsState => {
  switch (action.type) {
    case "ADD_LEAD":
      const leadData = action.payload as Lead;

      const newLead: Lead = {
        id: crypto.randomUUID(),
        name: leadData.name,
        lastName: leadData.lastName,
        company: leadData.company,
        email: leadData.email,
        phone: leadData.phone,
        source: leadData.source,
        status: leadData.status,
        column: (leadData as Lead).status,
        dateAdded: nowISO(),
      };
      let newLeads = [...state.leads, newLead];
      return {
        ...state,
        leads: newLeads,
        leadsCount: newLeads.length,
        newLeadsCount:
          leadData.status === LeadStatus.NEW
            ? state.newLeadsCount + 1
            : state.newLeadsCount,
        qualifiedLeadsCount:
          leadData.status === LeadStatus.QUALIFIED
            ? state.qualifiedLeadsCount + 1
            : state.qualifiedLeadsCount,
      };

    case "UPDATE_LEAD":
      const leadToUpdate = state.leads.find(
        (lead) => lead.id === action.payload.id,
      );

      if (!leadToUpdate) {
        return state; // Lead not found, return current state
      }

      const updatedLead = {
        ...leadToUpdate,
        ...action.payload.leadData,
        column: action.payload.leadData.status || leadToUpdate.status,
      };

      const updatedLeads = state.leads.map((lead) =>
        lead.id === action.payload.id ? updatedLead : lead,
      );

      return {
        ...state,
        leads: updatedLeads,
        newLeadsCount: updatedLeads.filter(
          (lead) => lead.status === LeadStatus.NEW,
        ).length,
      };

    case "SET_LEADS":
      const leadsMapped = action.payload.map((lead) => ({
        ...lead,
        status: lead.column,
      }));

      return {
        ...state,

        newLeadsCount: leadsMapped.filter(
          (lead) => lead.status === LeadStatus.NEW,
        ).length,

        qualifiedLeadsCount: leadsMapped.filter(
          (lead) => lead.status === LeadStatus.QUALIFIED,
        ).length,

        leads: leadsMapped,
      };

    case "DELETE_LEAD":
      const filteredLeads = state.leads.filter(
        (lead) => lead.id !== action.payload,
      );
      return {
        ...state,
        leads: filteredLeads,
        leadsCount: filteredLeads.length,
      };

    default:
      return state;
  }
};
