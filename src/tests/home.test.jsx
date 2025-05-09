import { describe, it, expect } from "vitest";
import Home from "../pages/Home";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("Home test", () => {
  it("renders home component", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(
      screen.getByText("BIGGEST DEALS ON TOP BRANDS!")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Shop Now" })
    ).toBeInTheDocument();
  });
  it("content exist", () => {
    render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
    expect(
      screen.getByRole("heading", { name: "Free Shipping" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "30-Day Return" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Premium Support" })
    ).toBeInTheDocument();
  });
  it("shop button link to shop correctly",()=> {
    render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      expect(screen.getByRole("link",{name:"Shop Now"})).toHaveAttribute("href","/shop");
  })
});
