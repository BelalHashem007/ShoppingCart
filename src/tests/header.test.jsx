import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "../components/header/Header";
import { MemoryRouter } from "react-router-dom";

describe("Header test", () => {
  it("renders heading", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });
  it("renders nav links", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
  it("renders home, shop and cart links", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByRole("link",{name:"Home"})).toBeInTheDocument();
    expect(screen.getByRole("link",{name:"Shop"})).toBeInTheDocument();
    expect(screen.getByRole("link",{name:"Cart"})).toBeInTheDocument();
  });
});
