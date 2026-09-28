import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import UsersPage from "@/app/(app)/users/page";
import { getSession } from "@/lib/auth/session";
import { getAllUsers } from "@/features/users/queries";
import { redirect } from "next/navigation";

vi.mock("@/lib/auth/session", () => ({
  getSession: vi.fn(),
}));

vi.mock("@/features/users/queries", () => ({
  getAllUsers: vi.fn(),
  isFollowing: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

describe("Users page", () => {
  it("redirects to login without a session", async () => {
    vi.mocked(getSession).mockResolvedValue(null);
    vi.mocked(redirect).mockImplementation(((url: string) => {
      throw new Error(`REDIRECT:${url}`);
    }) as never);
    await expect(UsersPage()).rejects.toThrow("REDIRECT:/login");
    expect(redirect).toHaveBeenCalledWith("/login");
  });

  it("shows an empty state when there are no other readers", async () => {
    vi.mocked(getSession).mockResolvedValue({ userId: "user-1" });
    vi.mocked(getAllUsers).mockResolvedValue([]);
    render(await UsersPage());
    expect(
      screen.getByRole("heading", { name: "People" }),
    ).toBeInTheDocument();
    expect(screen.getByText("No readers here yet.")).toBeInTheDocument();
  });
});
