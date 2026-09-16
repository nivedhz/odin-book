import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar";
import { getSession } from "@/lib/auth/session";
import { handleLogout } from "@/features/home/actions";
import userEvent from "@testing-library/user-event";

vi.mock("@/lib/auth/session", () => ({
  getSession: vi.fn(),
}));
vi.mock("@/features/home/actions", () => ({
  handleLogout: vi.fn(),
}));
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

async function renderLoggedOutNavbar() {
  vi.mocked(getSession).mockResolvedValue(null);
  render(await Navbar());
}

async function renderLoggedInNavbar() {
  vi.mocked(getSession).mockResolvedValue({
    userId: "a very amazing userId",
  });
  vi.mocked(handleLogout).mockResolvedValue({
    success: true,
    message: "Logout successful",
  });
  render(await Navbar());
}

describe("Navbar", () => {
  it("Renders", async () => {
    await renderLoggedOutNavbar();
    expect(screen.getByRole("navigation")).toBeDefined();
    expect(
      screen.getByRole("link", {
        name: "Booko",
      }),
    ).toBeDefined();
    expect(screen.getByRole("link", { name: "Login" })).toBeDefined();
    expect(screen.getByRole("link", { name: "Sign Up" })).toBeDefined();
  });
  it("Sign up button rendered", async () => {
    await renderLoggedOutNavbar();
    const signUpButton = screen.getByRole("link", { name: "Sign Up" });
    expect(signUpButton).toBeDefined();
    expect(signUpButton.getAttribute("href")).toBe("/sign-up");
  });
  it("Sign up redirects to /sign-up", async () => {
    await renderLoggedOutNavbar();
    const signUpButton = screen.getByRole("link", { name: "Sign Up" });
    expect(signUpButton.getAttribute("href")).toBe("/sign-up");
  });
  it("Login button rendered", async () => {
    await renderLoggedOutNavbar();
    const loginButton = screen.getByRole("link", { name: "Login" });
    expect(loginButton).toBeDefined();
    expect(loginButton.getAttribute("href")).toBe("/login");
  });
  it("Login redirects to /login", async () => {
    await renderLoggedOutNavbar();
    const loginButton = screen.getByRole("link", { name: "Login" });
    expect(loginButton.getAttribute("href")).toBe("/login");
  });
  it("Logout button rendered", async () => {
    await renderLoggedInNavbar();
    const logoutFormToggleButton = screen.getByRole("button", {
      name: "Logout",
    });
    expect(logoutFormToggleButton).toBeDefined();
  });
  it("logout button toggles logut modal", async () => {
    const user = userEvent.setup();
    await renderLoggedInNavbar();
    const logoutModalToggleButton = screen.getByRole("button", {
      name: "Logout",
    });
    await user.click(logoutModalToggleButton);
    const logoutModal = screen.getByRole("alertdialog");
    expect(logoutModal).toBeDefined();
  });
  it("Cancel button closes logout modal", async () => {
    const user = userEvent.setup();
    await renderLoggedInNavbar();
    const logoutModalToggleButton = screen.getByRole("button", {
      name: "Logout",
    });
    await user.click(logoutModalToggleButton);
    expect(screen.queryByRole("alertdialog")).not.toBeNull();
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    await user.click(cancelButton);
    expect(screen.queryByRole("alertdialog")).toBeNull();
  });
  it("Logout button calls handleLogout", async () => {
    const user = userEvent.setup();
    await renderLoggedInNavbar();
    const logoutModalToggleButton = screen.getByRole("button", {
      name: "Logout",
    });
    await user.click(logoutModalToggleButton);
    const logoutButton = screen.getByRole("button", { name: "Logout" });
    await user.click(logoutButton);
    expect(handleLogout).toHaveBeenCalled();
  });
});
