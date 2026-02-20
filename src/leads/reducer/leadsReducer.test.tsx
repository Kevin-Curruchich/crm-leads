import { describe, test, expect, beforeEach, vi } from "vitest";
import { leadsReducer, type LeadsAction } from "./leadsReducer";
import type { LeadsState } from "../domain/leads-state.interface";
import type { Lead } from "../domain/lead.interfact";
import { LeadStatus } from "../domain/lead-status.type";
import * as dateUtils from "@/lib/date.utils";

// Mock date utility
const mockDate = "2026-02-19T10:30:00Z";
vi.spyOn(dateUtils, "nowISO").mockReturnValue(mockDate);

// Store original randomUUID and mock it
const mockUUID = "550e8400-e29b-41d4-a716-446655440000";

beforeEach(() => {
  // Restore before each test to avoid side effects
  vi.spyOn(globalThis.crypto, "randomUUID").mockReturnValue(mockUUID);
});

const initialState: LeadsState = {
  leads: [],
  leadsCount: 0,
  newLeadsCount: 0,
  qualifiedLeadsCount: 0,
};

const mockLead: Lead = {
  id: "lead-1",
  name: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "123-456-7890",
  company: "ACME Corp",
  dateAdded: "2026-02-19T10:00:00Z",
  status: LeadStatus.NEW,
  column: LeadStatus.NEW,
};

const mockLeadQualified: Lead = {
  ...mockLead,
  id: "lead-2",
  status: LeadStatus.QUALIFIED,
  column: LeadStatus.QUALIFIED,
};

describe("leadsReducer", () => {
  describe("ADD_LEAD action", () => {
    test("should add a new lead with generated ID and date", () => {
      const action: LeadsAction = {
        type: "ADD_LEAD",
        payload: {
          name: "Jane",
          lastName: "Smith",
          email: "jane@example.com",
          phone: "987-654-3210",
          company: "Tech Inc",
          status: LeadStatus.NEW,
        },
      };

      const newState = leadsReducer(initialState, action);

      expect(newState.leads).toHaveLength(1);
      expect(newState.leadsCount).toBe(1);
      expect(newState.newLeadsCount).toBe(1);
    });

    test("should increment newLeadsCount when adding a NEW status lead", () => {
      const stateWithLead: LeadsState = {
        ...initialState,
        leads: [mockLead],
        newLeadsCount: 1,
        leadsCount: 1,
      };

      const action: LeadsAction = {
        type: "ADD_LEAD",
        payload: {
          name: "Another",
          lastName: "Lead",
          email: "another@example.com",
          phone: "111-111-1111",
          company: "Some Corp",
          status: LeadStatus.NEW,
        },
      };

      const newState = leadsReducer(stateWithLead, action);

      expect(newState.newLeadsCount).toBe(2);
      expect(newState.leadsCount).toBe(2);
    });
  });

  describe("UPDATE_LEAD action", () => {
    test("should update an existing lead's properties", () => {
      const stateWithLead: LeadsState = {
        ...initialState,
        leads: [mockLead],
        leadsCount: 1,
        newLeadsCount: 1,
      };

      const action: LeadsAction = {
        type: "UPDATE_LEAD",
        payload: {
          id: "lead-1",
          leadData: {
            name: "Updated",
            email: "updated@example.com",
          },
        },
      };

      const newState = leadsReducer(stateWithLead, action);

      expect(newState.leads[0]).toMatchObject({
        id: "lead-1",
        name: "Updated",
        email: "updated@example.com",
        status: LeadStatus.NEW,
        column: LeadStatus.NEW,
      });
    });

    test("should update status and sync with column field", () => {
      const stateWithLead: LeadsState = {
        ...initialState,
        leads: [mockLead],
        leadsCount: 1,
        newLeadsCount: 1,
        qualifiedLeadsCount: 0,
      };

      const action: LeadsAction = {
        type: "UPDATE_LEAD",
        payload: {
          id: "lead-1",
          leadData: {
            status: LeadStatus.QUALIFIED,
          },
        },
      };

      const newState = leadsReducer(stateWithLead, action);

      expect(newState.leads[0].status).toBe(LeadStatus.QUALIFIED);
      expect(newState.leads[0].column).toBe(LeadStatus.QUALIFIED);
    });

    test("should return unchanged state when lead is not found", () => {
      const action: LeadsAction = {
        type: "UPDATE_LEAD",
        payload: {
          id: "non-existent",
          leadData: {
            name: "Updated",
          },
        },
      };

      const newState = leadsReducer(initialState, action);

      expect(newState).toEqual(initialState);
    });
  });

  describe("SET_LEADS action", () => {
    test("should replace all leads and recalculate counts", () => {
      const newLeads: Lead[] = [
        { ...mockLead, id: "new-1" },
        { ...mockLeadQualified, id: "new-2" },
      ];

      const action: LeadsAction = {
        type: "SET_LEADS",
        payload: newLeads,
      };

      const newState = leadsReducer(initialState, action);

      expect(newState.leads).toHaveLength(2);
      expect(newState.newLeadsCount).toBe(1);
      expect(newState.qualifiedLeadsCount).toBe(1);
    });

    test("should sync status field with column field from payload", () => {
      const leadsWithDifferentValues: Lead[] = [
        {
          ...mockLead,
          status: LeadStatus.NEW,
          column: LeadStatus.CONTACTED, // column differs from status
        },
      ];

      const action: LeadsAction = {
        type: "SET_LEADS",
        payload: leadsWithDifferentValues,
      };

      const newState = leadsReducer(initialState, action);

      // SET_LEADS copies column value to status
      expect(newState.leads[0].status).toBe(LeadStatus.CONTACTED);
      expect(newState.leads[0].column).toBe(LeadStatus.CONTACTED);
    });
  });
});
