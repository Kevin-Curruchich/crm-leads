import { use } from "react";
import { beforeEach, describe, expect, test } from "vitest";
import { LeadsContext, LeadsProvider } from "./LeadsContext";
import { fireEvent, render, screen } from "@testing-library/react";
import type { Lead } from "../domain/lead.interfact";

const LeadMock: Lead = {
  id: "1",
  name: "Lead1",
  lastName: "Name",
  email: "lead1@name.com",
  phone: "12345678903423",
  company: "Lead Company",
  column: "NEW",
  status: "NEW",
} as Lead;

const TestComponent = () => {
  const {
    leads,
    leadsCount,
    newLeadsCount,
    qualifiedLeadsCount,
    addLead,
    deleteLead,
  } = use(LeadsContext);

  return (
    <div>
      <div
        data-testid="
        leads-count
      "
      >
        Leads Count: {leadsCount}
      </div>
      <div
        data-testid="
        new-leads-count
      "
      >
        New Leads Count: {newLeadsCount}
      </div>
      <div
        data-testid="
        qualified-leads-count
      "
      >
        Qualified Leads Count: {qualifiedLeadsCount}
      </div>
      {leads.map((lead) => (
        <div key={lead.id}>{lead.name}</div>
      ))}
      <button onClick={() => addLead(LeadMock)}>Add Lead</button>
      <button onClick={() => deleteLead(LeadMock.id)}>Delete Lead</button>
    </div>
  );
};

const RenderContextTest = () => {
  return (
    <LeadsProvider>
      <TestComponent />
    </LeadsProvider>
  );
};

describe("LeadsContext", () => {
  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test to ensure a clean state
  });

  test("should initialize with default values", () => {
    render(<RenderContextTest />);

    // Assertions can be made here based on the expected initial state
    expect(screen.queryByText("Lead Name")).toBeNull(); // Assuming no leads are present initially
    expect(screen.getByText("Leads Count: 0")).toBeTruthy();
    expect(screen.getByText("New Leads Count: 0")).toBeTruthy();
    expect(screen.getByText("Qualified Leads Count: 0")).toBeTruthy();
  });

  test("should add a lead and update counts", () => {
    render(<RenderContextTest />);

    // Simulate adding a lead
    const addButton = screen.getByText("Add Lead");
    fireEvent.click(addButton);

    // Assertions to check if the lead was added and counts updated
    expect(screen.getByText("Lead1")).toBeTruthy(); // Check if the lead name is displayed
    expect(screen.getByText("Leads Count: 1")).toBeTruthy();
    expect(screen.getByText("New Leads Count: 1")).toBeTruthy();
    expect(screen.getByText("Qualified Leads Count: 0")).toBeTruthy();
  });

  test("should delete a lead and update counts", () => {
    localStorage.setItem("leads", JSON.stringify([{ ...LeadMock, id: "1" }]));
    render(<RenderContextTest />);

    // Simulate deleting a lead
    const deleteButton = screen.getByText("Delete Lead"); // Assuming there's a delete button for each lead
    fireEvent.click(deleteButton);

    // Assertions to check if the lead was deleted and counts updated
    expect(screen.getByTestId("leads-count").textContent).toContain(
      "Leads Count: 0",
    );
    expect(screen.getByTestId("new-leads-count").textContent).toContain(
      "New Leads Count: 0",
    );
    expect(screen.getByTestId("qualified-leads-count").textContent).toContain(
      "Qualified Leads Count: 0",
    );
    expect(screen.queryByText("Lead1")).toBeNull(); // Check if the lead name is no longer displayed
  });
});
