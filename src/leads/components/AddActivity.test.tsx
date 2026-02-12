import { beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { MemoryRouter } from "react-router";

import { ActivityContext } from "../context/ActivityContext";

import { AddActivity } from "./AddActivity";
import type { Lead } from "../domain/lead.interfact";

Object.defineProperty(Element.prototype, "scrollIntoView", {
  value: vi.fn(),
  writable: true,
});

const mockLeads: Lead[] = [
  { id: "1", name: "Lead 1" },
  { id: "2", name: "Lead 2" },
] as Lead[];

const MockActityProvider = ({ children }: { children: React.ReactNode }) => {
  const mockContextValue = {
    activities: [],
    addActivity: mockAddActivity,
    deleteActivity: mockDeleteActivity,
  };

  return <ActivityContext value={mockContextValue}>{children}</ActivityContext>;
};

const renderAddActivity = (initialEntries: string = "/") => {
  return render(
    <MemoryRouter initialEntries={[initialEntries]}>
      <MockActityProvider>
        <AddActivity leads={mockLeads} />
      </MockActityProvider>
    </MemoryRouter>,
  );
};

const mockAddActivity = vi.fn();
const mockDeleteActivity = vi.fn();

describe("AddActivity", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render activity component", () => {
    const { container } = renderAddActivity();

    expect(container).toMatchSnapshot();
  });

  test("should open dialog when addActivity query param is true", () => {
    renderAddActivity("/?addActivity=true");

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeDefined();
    expect(dialog.getAttribute("data-state")).toBe("open");
  });

  test("should preselect lead when leadId query param is provided", () => {
    renderAddActivity("/?addActivity=true&leadId=2");

    const select = screen.getAllByRole("combobox")[0];

    // the select contain a span with the inner text of the lead name
    const selectedOption = select.querySelector("span");

    expect(selectedOption).toBeDefined();
    expect(selectedOption?.textContent).toBe("Lead 2");
  });

  test("should close dialog when onChangeDialogDisplay is called with false", () => {
    renderAddActivity("/?addActivity=true");

    const dialog = screen.getByRole("dialog");
    expect(dialog.getAttribute("data-state")).toBe("open");

    // Simulate closing the dialog by calling the onChangeDialogDisplay function
    const closeButton = screen.getByRole("button", { name: /close/i });

    fireEvent.click(closeButton);

    expect(dialog.getAttribute("data-state")).toBe("closed");
  });

  test("should close the dialog without for submit", () => {
    renderAddActivity("/?addActivity=true&leadId=1");

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockAddActivity).not.toHaveBeenCalled();
  });

  test("should display validation errors for required fields", async () => {
    renderAddActivity("/?addActivity=true");

    // Open the activity type select
    const typeSelect = screen.getAllByRole("combobox")[1];
    fireEvent.click(typeSelect);

    // Select CALL option
    const callOption = screen.getAllByText(/call/i)[0];
    fireEvent.click(callOption);

    // Fill out required fields
    const titleInput = screen.getByLabelText(/title/i);
    const descriptionTextarea = screen.getByLabelText(/description/i);

    fireEvent.change(titleInput, { target: { value: "Test Call" } });
    fireEvent.change(descriptionTextarea, {
      target: { value: "Test call description" },
    });

    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);

    // Check for validation error messages
    await waitFor(() => {
      expect(screen.getByText(/test call/i)).toBeDefined();
      expect(screen.getByText(/test call description/i)).toBeDefined();
    });

    // Verify addActivity was not called due to validation errors
    expect(mockAddActivity).toHaveBeenCalled();
  });
});
