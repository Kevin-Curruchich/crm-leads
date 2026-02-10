import { render } from "@testing-library/react";
import { describe, test } from "vitest";
import { KanbanLeadCard } from "./KanbanLeadCard";
import type { Lead } from "@/leads/domain/lead.interfact";
import { LeadStatus } from "@/leads/domain/lead-status.type";

describe("KanbanLeadCard", () => {
  test("Should render correctly", () => {
    const lead: Lead = {
      id: "1",
      name: "John",
      lastName: "Doe",
      status: LeadStatus.NEW,
      column: LeadStatus.NEW,
      company: "Acme Corp",
      email: "john@acme.com",
      phone: "123-456-7890",
      dateAdded: "2024-06-01T12:00:00Z",
    };

    render(<KanbanLeadCard lead={lead} />);
  });
});
