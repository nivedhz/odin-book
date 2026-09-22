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
});
