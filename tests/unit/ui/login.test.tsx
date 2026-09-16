import LoginForm from "@/features/auth/login/components/LoginForm";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { userEvent } from "@testing-library/user-event";

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
  it("Email Takes input", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    const emailInput = screen.getByLabelText("Email");
    expect(emailInput).toBeDefined();
    await user.type(emailInput, "Ri9wI@example.com");
    expect(emailInput).toHaveValue("Ri9wI@example.com");
  });
  it("Password Takes input", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toBeDefined();
    await user.type(passwordInput, "password");
    expect(passwordInput).toHaveValue("password");
  });
});
