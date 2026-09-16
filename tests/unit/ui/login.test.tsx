import LoginForm from "@/features/auth/login/components/LoginForm";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Login", () => {
  it("Renders", () => {
    render(<LoginForm />);

    expect(
      screen.getByRole("form", {
        name: "Login form",
      }),
    ).toBeDefined();
    expect(screen.getByRole("link", { name: "Home" })).toBeDefined();
    expect(
      screen.getByRole("heading", {
        name: "Welcome back...!",
      }),
    ).toBeDefined();
    expect(screen.getByLabelText("Email")).toBeDefined();
    expect(screen.getByLabelText("Password")).toBeDefined();
    expect(screen.getByRole("button", { name: "Login" })).toBeDefined();
  });
});
