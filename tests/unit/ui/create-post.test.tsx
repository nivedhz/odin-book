import { handleCreatePost } from "@/features/create/actions";
import CreatePostForm from "@/features/create/components/CreatePostForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/features/create/actions", () => ({
  handleCreatePost: vi.fn(),
}));

afterEach(() => {
  vi.resetAllMocks();
});

describe("Create Post UI", () => {
  it("Renders the create post page with the correct components", () => {
    render(<CreatePostForm />);
    expect(
      screen.getByRole("form", {
        name: "Create Post form",
      }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Content")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
  });
  it("Title takes input", async () => {
    const user = userEvent.setup();
    render(<CreatePostForm />);
    const titleInput = screen.getByLabelText("Title");
    expect(titleInput).toBeInTheDocument();
    await user.type(titleInput, "Test title");
    expect(titleInput).toHaveValue("Test title");
  });
  it("Content takes input", async () => {
    const user = userEvent.setup();
    render(<CreatePostForm />);
    const contentInput = screen.getByLabelText("Content");
    expect(contentInput).toBeInTheDocument();
    await user.type(contentInput, "Test content");
    expect(contentInput).toHaveValue("Test content");
  });
  it("Submit calls handleCreatePost", async () => {
    vi.mocked(handleCreatePost).mockResolvedValue({
      success: true,
      message: "Post created successfully",
    });
    const user = userEvent.setup();
    render(<CreatePostForm />);
    const titleInput = screen.getByLabelText("Title");
    const contentInput = screen.getByLabelText("Content");
    await user.type(titleInput, "Test title");
    await user.type(contentInput, "Test content");
    await user.click(screen.getByRole("button", { name: "Create" }));
    expect(handleCreatePost).toHaveBeenCalled();
  });
  it("Submit handles errors and shows error message", async () => {
    vi.mocked(handleCreatePost).mockResolvedValue({
      success: false,
      message: "Create Post failed",
    });
    const user = userEvent.setup();
    render(<CreatePostForm />);
    const titleInput = screen.getByLabelText("Title");
    const contentInput = screen.getByLabelText("Content");
    await user.type(titleInput, "Test title");
    await user.type(contentInput, "Test content");
    await user.click(screen.getByRole("button", { name: "Create" }));
    expect(handleCreatePost).toHaveBeenCalled();
    const errorMessage = screen.getByText("Create Post failed");
    expect(errorMessage).toBeInTheDocument();
  });
});
