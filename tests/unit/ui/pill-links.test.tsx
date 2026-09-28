import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { usePathname } from "next/navigation";
import PillLinks from "@/components/PillLinks";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

describe("PillLinks", () => {
  it("renders the three feed sections on the feed", () => {
    vi.mocked(usePathname).mockReturnValue("/");
    render(<PillLinks />);
    expect(screen.getByRole("navigation", { name: "Feed sections" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Posts" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Users" })).toHaveAttribute("href", "/users");
    expect(screen.getByRole("link", { name: "Followers" })).toHaveAttribute(
      "href",
      "/follower/post",
    );
  });

  it("marks the current section with aria-current", () => {
    vi.mocked(usePathname).mockReturnValue("/users");
    render(<PillLinks />);
    expect(screen.getByRole("link", { name: "Users" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(
      screen.getByRole("link", { name: "Posts" }),
    ).not.toHaveAttribute("aria-current");
  });

  it("renders nothing outside the feed pages", () => {
    vi.mocked(usePathname).mockReturnValue("/create");
    const { container } = render(<PillLinks />);
    expect(container.innerHTML).toBe("");
  });

  it("renders nothing on the post detail page", () => {
    vi.mocked(usePathname).mockReturnValue("/post/abc");
    const { container } = render(<PillLinks />);
    expect(container.innerHTML).toBe("");
  });
});
