"use server";

import z from "zod";
import { CreatePostState, PostFormData } from "./types";
import { createPost } from "./queries";
import { getSession } from "@/lib/auth/session";

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(3, "Content must be at least 3 characters"),
});

function getFormData(formData: FormData): PostFormData {
  return {
    title: String(formData.get("title")),
    content: String(formData.get("content")),
  };
}

export async function handleCreatePost(
  _prevState: CreatePostState,
  formData: FormData,
): Promise<CreatePostState> {
  const { title, content } = getFormData(formData);
  const validatedFields = schema.safeParse({
    title,
    content,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid form data",
    };
  }

  try {
    const session = await getSession();
    if (!session)
      return {
        success: false,
        message: "You must be logged in to create a post",
      };
    await createPost(
      validatedFields.data.title,
      validatedFields.data.content,
      String(session.userId),
    );
  } catch (_err) {
    return {
      success: false,
      message: "Failed to create post",
    };
  }
  return {
    success: true,
    message: "Post created successfully",
  };
}
