import LoginForm from "@/features/auth/login/components/LoginForm";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { handleLogin } from "@/features/auth/login/actions";

vi.mock("@/features/auth/login/actions", () => ({
  handleLogin: vi.fn(),
}));

describe("Login UI", () => {
  it("Renders the login page with the correct components", () => {
    render(<LoginForm />);

    expect(
      screen.getByRole("form", {
        name: "Login form",
      }),
    ).toBeDefined();
    expect(screen.getByLabelText("Email")).toBeDefined();
    expect(screen.getByLabelText("Password")).toBeDefined();
    expect(screen.getByRole("button", { name: "Login" })).toBeDefined();
  });
  it("Email takes input", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    const emailInput = screen.getByLabelText("Email");
    expect(emailInput).toBeDefined();
    await user.type(emailInput, "Ri9wI@example.com");
    expect(emailInput).toHaveValue("Ri9wI@example.com");
  });
  it("Password takes input", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toBeDefined();
    await user.type(passwordInput, "password");
    expect(passwordInput).toHaveValue("password");
  });
  it("Submit calls handleLogin", async () => {
    vi.mocked(handleLogin).mockResolvedValue({
      success: true,
      message: "Login successful",
    });
    const user = userEvent.setup();
    render(<LoginForm />);
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    await user.type(emailInput, "Ri9wI@example.com");
    await user.type(passwordInput, "password");
    await user.click(screen.getByRole("button", { name: "Login" }));
    expect(handleLogin).toHaveBeenCalled();
  });
  it("Submit handles errors and displays error message", async () => {
    vi.mocked(handleLogin).mockResolvedValue({
      success: false,
      message: "Login failed",
    });
    const user = userEvent.setup();
    render(<LoginForm />);
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    await user.type(emailInput, "Ri9wI@example.com");
    await user.type(passwordInput, "password");
    await user.click(screen.getByRole("button", { name: "Login" }));
    expect(handleLogin).toHaveBeenCalled();
    const errorMessage = screen.getByText("Login failed");
    expect(errorMessage).toBeDefined();
  });
  it("Doesn't allow unfilled forms", async () => {
    vi.mocked(handleLogin).mockResolvedValue({
      success: false,
      message: "Login failed",
    });
    const user = userEvent.setup();
    render(<LoginForm />);
    const emailInput = screen.getByLabelText("Email");
    await user.type(emailInput, "Ri9wI@example.com");
    await user.click(screen.getByRole("button", { name: "Login" }));
    expect(handleLogin).not.toHaveBeenCalled();
  });
});
