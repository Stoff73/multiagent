/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import Home from "./page";
import "@testing-library/jest-dom";
import { useRouter } from "next/router";

/* Removed inline mock for next/link to use __mocks__ module */
jest.unmock("next/link");

describe("Landing Page", () => {
  it("renders hero section", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /discover athenaos/i })).toBeInTheDocument();
  });

  it("renders screenshot carousel", () => {
    render(<Home />);
    expect(screen.getByLabelText(/screenshots/i)).toBeInTheDocument();
  });

  it("renders feature bullets", () => {
    render(<Home />);
    expect(screen.getByText(/key features/i)).toBeInTheDocument();
    expect(screen.getByText(/instant onboarding/i)).toBeInTheDocument();
  });

  it("renders Sign in CTA and Get Started button", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: /sign in/i })).toHaveAttribute("href", "/auth/login");
    expect(screen.getByRole("link", { name: /get started/i })).toHaveAttribute("href", "/auth/signup");
  });
});