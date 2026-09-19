import SignUpForm from "@/features/auth/sign-up/components/SignUpForm";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { handleSignUp } from "@/features/auth/sign-up/actions";

vi.mock("@/features/auth/sign-up/actions", () => ({
  handleSignUp: vi.fn(),
}));

describe("Sign Up", () => {
  it("Renders the sign up page with the correct components", () => {
    render(<SignUpForm />);

    expect(
      screen.getByRole("form", {
        name: "Sign Up form",
      }),
    ).toBeDefined();
    expect(screen.getByRole("link", { name: "Home" })).toBeDefined();
    expect(
      screen.getByRole("heading", {
        name: "Sign up to Booko",
      }),
    ).toBeDefined();
    expect(screen.getByLabelText("Username")).toBeDefined();
    expect(screen.getByLabelText("Email")).toBeDefined();
    expect(screen.getByLabelText("Password")).toBeDefined();
    expect(screen.getByRole("button", { name: "Sign Up" })).toBeDefined();
  });
  it("Home link takes to /", () => {
    render(<SignUpForm />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
  });
  it("Username takes input", async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);
    const usernameInput = screen.getByLabelText("Username");
    expect(usernameInput).toBeDefined();
    await user.type(usernameInput, "lsdfjsldfjslf");
    expect(usernameInput).toHaveValue("lsdfjsldfjslf");
  });
  it("Email takes input", async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);
    const emailInput = screen.getByLabelText("Email");
    expect(emailInput).toBeDefined();
    await user.type(emailInput, "Ri9wI@example.com");
    expect(emailInput).toHaveValue("Ri9wI@example.com");
  });
  it("Password takes input", async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);
    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toBeDefined();
    await user.type(passwordInput, "password");
    expect(passwordInput).toHaveValue("password");
  });
  it("Submit calls handleSignUp", async () => {
    vi.mocked(handleSignUp).mockResolvedValue({
      success: true,
      message: "Account created successfully",
    });
    const user = userEvent.setup();
    render(<SignUpForm />);
    const usernameInput = screen.getByLabelText("Username");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    await user.type(usernameInput, "lsdfjsldfjslf");
    await user.type(emailInput, "Ri9wI@example.com");
    await user.type(passwordInput, "password");
    await user.click(screen.getByRole("button", { name: "Sign Up" }));
    expect(handleSignUp).toHaveBeenCalled();
  });
  it("Submit handles errors and shows error message", async () => {
    vi.mocked(handleSignUp).mockResolvedValue({
      success: false,
      message: "Sign Up failed",
    });
    const user = userEvent.setup();
    render(<SignUpForm />);
    const usernameInput = screen.getByLabelText("Username");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    await user.type(usernameInput, "lsdfjsldfjslf");
    await user.type(emailInput, "Ri9wI@example.com");
    await user.type(passwordInput, "password");
    await user.click(screen.getByRole("button", { name: "Sign Up" }));
    expect(handleSignUp).toHaveBeenCalled();
    const errorMessage = screen.getByText("Sign Up failed");
    expect(errorMessage).toBeDefined();
  });
  it("Doesn't allow unfilled forms", async () => {
    vi.mocked(handleSignUp).mockResolvedValue({
      success: false,
      message: "Sign Up failed",
    });
    const user = userEvent.setup();
    render(<SignUpForm />);
    const usernameInput = screen.getByLabelText("Username");
    const emailInput = screen.getByLabelText("Email");
    await user.type(usernameInput, "lsdfjsldfjslf");
    await user.type(emailInput, "Ri9wI@example.com");
    await user.click(screen.getByRole("button", { name: "Sign Up" }));
    expect(handleSignUp).not.toHaveBeenCalled();
  });
});
