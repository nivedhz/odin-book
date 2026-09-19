import { handleCreatePost } from "@/features/create/actions";
import { createPost } from "@/features/create/queries";
import { getSession } from "@/lib/auth/session";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/features/create/queries", () => ({
  createPost: vi.fn(),
}));
vi.mock("@/lib/auth/session", () => ({
  getSession: vi.fn(),
}));

describe("create-post", () => {
  it("returns an error when the form data is invalid", async () => {
    vi.mocked(createPost).mockResolvedValue(null);
    const formData = new FormData();
    formData.set("content", "test");

    const result = await handleCreatePost(
      {
        success: false,
        message: "",
      },
      formData,
    );

    expect(result).toEqual({
      success: false,
      message: "Invalid form data",
    });
  });

  it("returns a success message when the form data is valid", async () => {
    vi.mocked(createPost).mockResolvedValue({
      title: "test",
      content: "test",
      authorId: "test",
    });
    vi.mocked(getSession).mockResolvedValue({
      userId: "test",
    });
    const formData = new FormData();
    formData.set("title", "test");
    formData.set("content", "test");

    const result = await handleCreatePost(
      {
        success: false,
        message: "",
      },
      formData,
    );

    expect(result).toEqual({
      success: true,
      message: "Post created successfully",
    });
  });
  it("returns an error message when the session is not active", async () => {
    vi.mocked(createPost).mockResolvedValue({
      title: "test",
      content: "test",
      authorId: "test",
    });
    vi.mocked(getSession).mockResolvedValue(null);
    const formData = new FormData();
    formData.set("title", "test");
    formData.set("content", "test");

    const result = await handleCreatePost(
      {
        success: false,
        message: "",
      },
      formData,
    );

    expect(result).toEqual({
      success: false,
      message: "You must be logged in to create a post",
    });
  });
  it("returns an error message when the try-catch throws", async () => {
    vi.mocked(createPost).mockRejectedValue(new Error("test"));
    vi.mocked(getSession).mockResolvedValue({
      userId: "test",
    });
    const formData = new FormData();
    formData.set("title", "test");
    formData.set("content", "test");

    const result = await handleCreatePost(
      {
        success: false,
        message: "",
      },
      formData,
    );

    expect(result).toEqual({
      success: false,
      message: "Failed to create post",
    });
  });
});
