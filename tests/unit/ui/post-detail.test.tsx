import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import PostDetail from "@/app/(app)/post/[postId]/page";
import { getSession } from "@/lib/auth/session";
import { findComments, findPost } from "@/features/post/queries";
import { getUserVote, getVotes } from "@/features/post/actions";
import { redirect } from "next/navigation";

vi.mock("@/lib/auth/session", () => ({
  getSession: vi.fn(),
}));

vi.mock("@/features/post/queries", () => ({
  findPost: vi.fn(),
  findComments: vi.fn(),
}));

vi.mock("@/features/post/actions", () => ({
  getVotes: vi.fn(),
  getUserVote: vi.fn(),
  handleVote: vi.fn(),
  handleComment: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
  notFound: vi.fn(),
}));

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

const post = {
  id: "post-1",
  title: "A quiet essay",
  content: "Longform reading for the room",
  authorId: "user-1",
  createdAt: new Date(),
  author: { username: "essayist" },
};

const params = Promise.resolve({ postId: "post-1" });

describe("Post detail", () => {
  it("renders the title, comment count, and an empty-comment state", async () => {
    vi.mocked(getSession).mockResolvedValue({ userId: "user-2" });
    vi.mocked(findPost).mockResolvedValue(post);
    vi.mocked(findComments).mockResolvedValue([]);
    vi.mocked(getVotes).mockResolvedValue(0);
    vi.mocked(getUserVote).mockResolvedValue(0);
    render(await PostDetail({ params }));
    expect(
      screen.getByRole("heading", { name: "A quiet essay" }),
    ).toBeInTheDocument();
    expect(screen.getByText("No comments yet — start the conversation.")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /back to feed/i }),
    ).toHaveAttribute("href", "/");
  });

  it("renders comments with author and content", async () => {
    vi.mocked(getSession).mockResolvedValue({ userId: "user-2" });
    vi.mocked(findPost).mockResolvedValue(post);
    vi.mocked(findComments).mockResolvedValue([
      {
        id: "comment-1",
        content: "Beautifully put",
        createdAt: new Date(),
        updatedAt: new Date(),
        authorId: "user-2",
        postId: "post-1",
        author: { username: "reader" },
      },
    ]);
    vi.mocked(getVotes).mockResolvedValue(2);
    vi.mocked(getUserVote).mockResolvedValue(0);
    render(await PostDetail({ params }));
    expect(screen.getByText("Beautifully put")).toBeInTheDocument();
    expect(screen.getByText("u/reader")).toBeInTheDocument();
    expect(screen.queryByText("No comments yet — start the conversation.")).not.toBeInTheDocument();
  });

  it("shows the edit action to the author only", async () => {
    vi.mocked(getSession).mockResolvedValue({ userId: "user-1" });
    vi.mocked(findPost).mockResolvedValue(post);
    vi.mocked(findComments).mockResolvedValue([]);
    vi.mocked(getVotes).mockResolvedValue(0);
    vi.mocked(getUserVote).mockResolvedValue(0);
    render(await PostDetail({ params }));
    expect(
      screen.getByRole("link", { name: "Edit post" }),
    ).toHaveAttribute("href", "/post/post-1/edit");
  });
});
