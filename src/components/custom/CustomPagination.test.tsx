import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { CustomPagination } from "./CustomPagination";
import { MemoryRouter } from "react-router";

const renderWithRouter = (totalPages: number, initialEntries: string = "/") => {
  return render(
    <MemoryRouter initialEntries={[initialEntries]}>
      <CustomPagination totalPages={totalPages} />
    </MemoryRouter>,
  );
};

describe("CustomPagination", () => {
  test("Should render correctly with totalPages", () => {
    const totalPages = 10;

    const { container } = renderWithRouter(totalPages);

    expect(container).toMatchSnapshot();
  });

  test("Should render correctly on a specific page", () => {
    const totalPages = 10;
    const initialEntries = "/?page=5";

    renderWithRouter(totalPages, initialEntries);

    const currentPageItem = screen.getByText("5");
    expect(currentPageItem.getAttribute("data-active")).toBeTruthy();
  });

  test("Should go to next page when clicking next button", () => {
    const totalPages = 10;
    const initialEntries = "/?page=3";

    renderWithRouter(totalPages, initialEntries);

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    const page4Item = screen.getByText("4");
    expect(page4Item.getAttribute("aria-current")).toBe("page");
  });
});
