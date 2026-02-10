import { describe, expect, test } from "vitest";
import { LeadsStats } from "./LeadsStats";
import { render, screen } from "@testing-library/react";

describe("LeadsStat", () => {
  test("Should render correctly", () => {
    const mockData = {
      leadsCount: 100,
      newLeadsCount: 20,
      qualifiedLeadsCount: 50,
    };

    render(
      <LeadsStats
        leadsCount={mockData.leadsCount}
        newLeadsCount={mockData.newLeadsCount}
        qualifiedLeadsCount={mockData.qualifiedLeadsCount}
      />,
    );

    const totalLeads = screen.getByText(mockData.leadsCount.toString());
    const newLeads = screen.getByText(mockData.newLeadsCount.toString());
    const qualifiedLeads = screen.getByText(
      mockData.qualifiedLeadsCount.toString(),
    );

    expect(totalLeads).toBeDefined();
    expect(newLeads).toBeDefined();
    expect(qualifiedLeads).toBeDefined();
  });
});
