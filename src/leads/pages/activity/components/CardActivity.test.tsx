import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CardActivity } from "./CardActivity";
import type { Activity } from "@/leads/domain/activity.interface";
import * as dateUtils from "@/lib/date.utils";

const activityMock: Activity = {
  id: "1",
  leadId: "lead-1",
  leadName: "John Doe",
  type: "CALL",
  title: "Follow-up Call",
  description: "Had a great conversation about the project.",
  dateCreated: "2024-06-15T10:00:00Z",
};

describe("CardActivity", () => {
  test("Shoulud render corrctly", () => {
    const { container } = render(<CardActivity activity={activityMock} />);

    expect(container).toMatchSnapshot();
  });

  test("Should display the activity icon based on activity type", () => {
    render(<CardActivity activity={activityMock} />);

    const activityIcon = screen.getByTestId("activity-icon");

    expect(activityIcon.childElementCount).toBe(1);
  });

  test("Should call formatRelativeDate with correct date", () => {
    const formatRelativeDateSpy = vi.spyOn(dateUtils, "formatRelativeDate");
    render(<CardActivity activity={activityMock} />);
    screen.debug();
    expect(formatRelativeDateSpy).toHaveBeenCalledWith(
      activityMock.dateCreated,
    );

    formatRelativeDateSpy.mockRestore();
  });
});
