import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Home from "@/app/(app)/page";
import { getAllPosts } from "@/features/home/queries";
import { getUserVote, getVotes } from "@/features/post/actions";

vi.mock("@/features/home/queries", () => ({
  getAllPosts: vi.fn(),
}));

vi.mock("@/features/post/actions", () => ({
  getVotes: vi.fn(),
  getUserVote: vi.fn(),
  handleVote: vi.fn(),
}));

// The real card suspends when nested un-awaited inside Home under jsdom;
// it is covered on its own in post.test.tsx.
vi.mock("@/features/post/components/Post", () => ({
  default: ({ post }: { post: { title: string } }) => (
    <article aria-label={`Post ${post.title}`} />
  ),
}));

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

const post = {
  id: "post-1",
  title: "First light",
  content: "Hello reading room",
  authorId: "user-1",
  createdAt: new Date(),
  author: { username: "reader" },
};

describe("Feed", () => {
  it("renders the feed heading", async () => {
    vi.mocked(getAllPosts).mockResolvedValue([]);
    render(await Home());
    expect(
      screen.getByRole("heading", { name: "Latest Posts" }),
    ).toBeInTheDocument();
  });

  it("shows an empty state with a write CTA when there are no posts", async () => {
    vi.mocked(getAllPosts).mockResolvedValue([]);
    render(await Home());
    expect(screen.getByText("No posts yet…")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Write a post" })).toHaveAttribute(
      "href",
      "/create",
    );
  });

  it("renders a post card for every post", async () => {
    vi.mocked(getAllPosts).mockResolvedValue([post]);
    vi.mocked(getVotes).mockResolvedValue(3);
    vi.mocked(getUserVote).mockResolvedValue(1);
    render(await Home());
    expect(
      screen.getByRole("article", { name: `Post ${post.title}` }),
    ).toBeInTheDocument();
    expect(screen.queryByText("No posts yet…")).not.toBeInTheDocument();
  });
});
