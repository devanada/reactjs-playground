import "@testing-library/jest-dom";

import { render, screen, within, fireEvent, act } from "@/__tests__/test-utils";

import Navbar from "@/components/navbar";

describe("Navbar Component", () => {
  beforeEach(async () => {
    await act(async () => {
      render(<Navbar />);
    });
  });

  it("should render the navbar", () => {
    const navbar = screen.getByLabelText("navbar");

    expect(navbar).toBeInTheDocument;
  });

  it("should render FaSun when changing the theme to light", async () => {
    const navbar = screen.getByLabelText("navbar");
    const darkBtn = within(navbar).getByLabelText("btn-theme-dark");

    expect(darkBtn).toBeInTheDocument;

    await act(async () => {
      fireEvent.click(darkBtn);
    });

    expect(within(navbar).getByLabelText("btn-theme-light")).toBeInTheDocument;
  });

  it("should render FaMoon when changing the theme back to dark", async () => {
    const navbar = screen.getByLabelText("navbar");
    const lightBtn = within(navbar).getByLabelText("btn-theme-light");

    expect(lightBtn).toBeInTheDocument;

    await act(async () => {
      fireEvent.click(lightBtn);
    });

    expect(within(navbar).getByLabelText("btn-theme-dark")).toBeInTheDocument;
  });
});
