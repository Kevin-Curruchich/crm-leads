import { LeadStatus } from "../domain/lead-status.type";
import type { Lead } from "../domain/lead.interfact";
import type { LeadsState } from "../domain/leads-state.interface";

export type LeadsAction =
  | { type: "ADD_LEAD"; payload: Omit<Lead, "id" | "dateAdded"> }
  | { type: "DELETE_LEAD"; payload: { id: string } }
  | {
      type: "UPDATE_LEAD";
      payload: { id: string; leadData: Partial<Lead> };
    }
  | { type: "SET_LEADS"; payload: Lead[] }
  | { type: "DELETE_LEAD"; payload: string };

export const leadsReducer = (
  state: LeadsState,
  action: LeadsAction,
): LeadsState => {
  switch (action.type) {
    case "ADD_LEAD":
      const newLead: Lead = {
        ...action.payload,
        id: crypto.randomUUID(),
        column: action.payload.status,
        dateAdded: new Date().toISOString(),
      };
      let newLeads = [...state.leads, newLead];
      return {
        ...state,
        leads: newLeads,
        leadsCount: newLeads.length,
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
      };

    case "SET_LEADS":
      return {
        ...state,
        leads: action.payload.map((lead) => ({
          ...lead,
          status: lead.column,
        })),
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
