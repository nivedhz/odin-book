import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import PostEditForm from "@/features/post/components/PostEditForm";

afterEach(() => {
  cleanup();
});

const post = {
  id: "post-1",
  title: "Original title",
  content: "Original content",
};

describe("PostEditForm", () => {
  it("renders the edit form with the post values filled in", () => {
    render(<PostEditForm post={post} />);
    expect(
      screen.getByRole("form", { name: "Edit Post form" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Title")).toHaveValue("Original title");
    expect(screen.getByLabelText("Content")).toHaveValue("Original content");
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
  });
});
