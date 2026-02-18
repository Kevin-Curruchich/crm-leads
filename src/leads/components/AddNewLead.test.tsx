import type { PropsWithChildren } from "react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";

import { LeadsContext } from "../context/LeadsContext";
import { AddNewLead } from "./AddNewLead";

const mockAddLead = vi.fn();
const mockUpdateLead = vi.fn();
const mockSetLeads = vi.fn();
const mockDeleteLead = vi.fn();
const mockGetLeadById = vi.fn();

const MockLeadProvider = ({ children }: PropsWithChildren) => {
  const mockContextValue = {
    leads: [],
    leadsCount: 0,
    newLeadsCount: 0,
    qualifiedLeadsCount: 0,
    addLead: mockAddLead,
    updateLead: mockUpdateLead,
    setLeads: mockSetLeads,
    deleteLead: mockDeleteLead,
    getLeadById: mockGetLeadById,
  };

  return (
    <LeadsContext.Provider value={mockContextValue}>
      {children}
    </LeadsContext.Provider>
  );
};

const renderAddNewLead = (initialentries: string = "/") => {
  return render(
    <MemoryRouter initialEntries={[initialentries]}>
      <MockLeadProvider>
        <AddNewLead />
      </MockLeadProvider>
    </MemoryRouter>,
  );
};

describe("AddNewLead", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("Should render AddNewLead component", () => {
    const { container } = renderAddNewLead();

    expect(container).toMatchSnapshot();
  });

  test("should open dialog when leadModalOpen query param is true", () => {
    renderAddNewLead("/?leadModalOpen=true");

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeDefined();
    expect(dialog?.getAttribute("data-state")).toBe("open");
  });

  test("should not call addLead if form validation fails", async () => {
    renderAddNewLead("/?leadModalOpen=true");

    const saveButton = screen.getByRole("button", { name: /save/i });
    expect(saveButton).toBeDefined();

    fireEvent.click(saveButton);

    await waitFor(() => {
      screen.findByText(/name must be at least 2 characters/i);
      screen.findByText(/last name must be at least 2 characters/i);
      screen.findByText(/invalid email address/i);
      screen.findByText(/phone number must be at least 10 characters/i);
      screen.findByText(/company name must be at least 2 characters/i);
    });

    expect(mockAddLead).not.toHaveBeenCalled();
  });

  test("should call addLead with correct data when form is submitted", async () => {
    const user = userEvent.setup();
    renderAddNewLead("/?leadModalOpen=true");

    const nameInput = screen.getByLabelText(/^name$/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const phoneInput = screen.getByLabelText(/phone/i);
    const companyInput = screen.getByLabelText(/company/i);
    const saveButton = screen.getByRole("button", { name: /save lead/i });

    await user.type(nameInput, "John");
    await user.type(lastNameInput, "Doe");
    await user.type(emailInput, "john@company.com");
    await user.type(phoneInput, "1234567890");
    await user.type(companyInput, "Company");

    await user.click(saveButton);

    await waitFor(() => {
      expect(mockAddLead).toHaveBeenCalledOnce();
      expect(mockAddLead).toHaveBeenCalledWith({
        name: "John",
        lastName: "Doe",
        email: "john@company.com",
        phone: "1234567890",
        company: "Company",
        status: "NEW",
      });
    });
  });
});
