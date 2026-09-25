"use server";

import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import z from "zod";
import { createComment } from "./queries";
import { CommentResponse } from "./types";

const schema = z.object({
  comment: z.string().min(3, "Comment must be at least 3 characters"),
  postId: z.string().min(3, "Post id must be at least 3 characters"),
});

function getFormData(formData: FormData) {
  return {
    comment: formData.get("comment"),
    postId: formData.get("post"),
  };
}

export async function handleComment(
  _prevState: CommentResponse,
  formData: FormData,
) {
  const { comment: rawComment, postId: rawPostId } = getFormData(formData);
  const validatedFields = schema.safeParse({
    comment: rawComment,
    postId: rawPostId,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid form data",
    };
  }

  try {
    const session = await getSession();
    if (!session?.userId) {
      redirect("/login");
    }
    const userId = session.userId as string;
    await createComment(
      validatedFields.data.comment,
      userId,
      validatedFields.data.postId,
    );
  } catch (_err) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
  return {
    success: true,
    message: "Comment created successfully",
  };
}
