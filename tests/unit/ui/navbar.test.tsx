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
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
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
  it("Renders the navbar with the correct components in logged out state", async () => {
    await renderLoggedOutNavbar();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "Booko",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign Up" })).toBeInTheDocument();
  });
  it("Sign up button rendered in logged out state", async () => {
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
  it("Login button rendered in logged out state", async () => {
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
  it("Logout button rendered in logged in state", async () => {
    const user = userEvent.setup();
    await renderLoggedInNavbar();
    await user.click(screen.getByRole("button", { name: "account toggle" }));
    expect(await screen.findByRole("button", { name: "Logout" })).toBeDefined();
  });
  it("Create post button rendered in logged in state", async () => {
    await renderLoggedInNavbar();
    expect(
      await screen.findByRole("button", { name: "Create Post" }),
    ).toBeDefined();
  });
  it("logout button toggles logut modal", async () => {
    const user = userEvent.setup();
    await renderLoggedInNavbar();
    await user.click(screen.getByRole("button", { name: "account toggle" }));
    await user.click(await screen.findByRole("button", { name: "Logout" }));
    expect(await screen.findByRole("alertdialog")).not.toBeNull();
  });
  it("Cancel button closes logout modal", async () => {
    const user = userEvent.setup();
    await renderLoggedInNavbar();
    await user.click(screen.getByRole("button", { name: "account toggle" }));
    await user.click(await screen.findByRole("button", { name: "Logout" }));
    expect(await screen.findByRole("alertdialog")).not.toBeNull();
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    await user.click(cancelButton);
    expect(screen.queryByRole("alertdialog")).toBeNull();
  });
  it("Logout button calls handleLogout", async () => {
    const user = userEvent.setup();
    await renderLoggedInNavbar();
    await user.click(screen.getByRole("button", { name: "account toggle" }));
    await user.click(await screen.findByRole("button", { name: "Logout" }));
    expect(await screen.findByRole("alertdialog")).not.toBeNull();
    const logoutButton = screen.getByRole("button", { name: "Logout" });
    await user.click(logoutButton);
    expect(handleLogout).toHaveBeenCalled();
  });
});
