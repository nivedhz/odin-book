import { getUserVote, getVotes } from "@/features/home/actions";
import Post from "@/features/home/components/Post";
import { render, screen } from "@testing-library/react";
import { format } from "timeago.js";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/features/home/actions", () => ({
  getVotes: vi.fn(),
  getUserVote: vi.fn(),
}));

afterEach(() => {
  vi.resetAllMocks();
});

describe("Post UI", () => {
  it("Renders the Post with the correct components", async () => {
    const post = {
      id: "some id",
      title: "Test title",
      content: "Test content",
      authorId: "some id",
      createdAt: new Date(),
      author: {
        username: "Test user",
      },
    };
    vi.mocked(getVotes).mockResolvedValue(0);
    vi.mocked(getUserVote).mockResolvedValue(0);
    render(await Post({ post }));

    expect(
      screen.getByRole("article", { name: `Post ${post.title}` }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("paragraph", {
        name: `Post Author ${post.author.username}`,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: `Post Title ${post.title}`,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("paragraph", {
        name: `Post Created at ${format(post.createdAt)}`,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(`Post Content ${post.content}`),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(`Post Content ${post.content}`),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: `Upvote ${post.title}`,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: `Downvote ${post.title}`,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: `Comment on ${post.title}`,
      }),
    ).toBeInTheDocument();
  });
  it("Renders the Post with the correct votes", async () => {
    const post = {
      id: "some id",
      title: "Test title",
      content: "Test content",
      authorId: "some id",
      createdAt: new Date(),
      author: {
        username: "Test user",
      },
    };
    vi.mocked(getVotes).mockResolvedValue(0);
    vi.mocked(getUserVote).mockResolvedValue(0);
    render(await Post({ post }));

    expect(
      screen.getByRole("button", { name: `Upvote ${post.title}` }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: `Upvote ${post.title}` }).textContent,
    ).toBe("0");
  });
  it("Changes the vote to the correct value after button click", async () => {
    const post = {
      id: "some id",
      title: "Test title",
      content: "Test content",
      authorId: "some id",
      createdAt: new Date(),
      author: {
        username: "Test user",
      },
    };
    vi.mocked(getVotes).mockResolvedValue(0);
    vi.mocked(getUserVote).mockResolvedValue(0);
    const { container: initialPost, unmount } = render(await Post({ post }));

    expect(
      screen.getByRole("button", { name: `Upvote ${post.title}` }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: `Upvote ${post.title}` }).textContent,
    ).toBe("0");
    unmount();
    expect(initialPost.innerHTML).toBe("");

    vi.mocked(getUserVote).mockResolvedValue(1);
    vi.mocked(getVotes).mockResolvedValue(1);
    const { container: upvotedPost, unmount: unmountUpvoted } = render(
      await Post({ post }),
    );
    vi.mocked(getUserVote).mockResolvedValue(1);
    vi.mocked(getVotes).mockResolvedValue(1);
    expect(
      screen.getByRole("button", { name: `Upvote ${post.title}` }).textContent,
    ).toBe("1");
    unmountUpvoted();
    expect(upvotedPost.innerHTML).toBe("");

    vi.mocked(getUserVote).mockResolvedValue(-1);
    vi.mocked(getVotes).mockResolvedValue(-1);
    const { container: downvotedPost, unmount: unmountDownvoted } = render(
      await Post({ post }),
    );
    vi.mocked(getUserVote).mockResolvedValue(-1);
    vi.mocked(getVotes).mockResolvedValue(-1);
    expect(
      screen.getByRole("button", { name: `Upvote ${post.title}` }).textContent,
    ).toBe("-1");
    unmountDownvoted();
    expect(downvotedPost.innerHTML).toBe("");
  });
});
