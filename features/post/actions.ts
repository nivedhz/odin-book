"use server";

import { getSession } from "@/lib/auth/session";
import { VoteType } from "@/lib/generated/prisma/enums";
import { redirect } from "next/navigation";
import z from "zod";
import { createComment, deletePost, updatePost } from "./queries";
import { CommentResponse, PostEditResponse } from "./types";
import { CreatePostResponse, InputData } from "./types";
import {
  createPost,
  createVote,
  deleteVote,
  findAllVotes,
  findExistingVote,
  findUserVote,
} from "./queries";

const commentSchema = z.object({
  comment: z.string().min(3, "Comment must be at least 3 characters"),
  postId: z.string().min(3, "Post id must be at least 3 characters"),
});

function getCommentFormData(formData: FormData) {
  return {
    comment: formData.get("comment"),
    postId: formData.get("post"),
  };
}

export async function handleComment(
  _prevState: CommentResponse,
  formData: FormData,
) {
  const { comment: rawComment, postId: rawPostId } =
    getCommentFormData(formData);
  const validatedFields = commentSchema.safeParse({
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

function getPostFormData(formData: FormData) {
  return {
    title: formData.get("title"),
    content: formData.get("content"),
    postId: formData.get("postId"),
  };
}

const postSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(3, "Content must be at least 3 characters"),
  postId: z.string().min(3, "Post id must be at least 3 characters"),
});

export async function handlePostEdit(
  _prevState: PostEditResponse,
  formData: FormData,
): Promise<PostEditResponse> {
  const {
    title: rawTitle,
    content: rawContent,
    postId: rawPostId,
  } = getPostFormData(formData);
  const validatedFields = postSchema.safeParse({
    title: rawTitle,
    content: rawContent,
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
    await updatePost(
      validatedFields.data.title,
      validatedFields.data.content,
      validatedFields.data.postId,
    );
  } catch (_err) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
  redirect("/");
}

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(3, "Content must be at least 3 characters"),
});

function getFormData(formData: FormData): InputData {
  return {
    title: formData.get("title"),
    content: formData.get("content"),
  };
}

export async function handleCreatePost(
  _prevState: CreatePostResponse,
  formData: FormData,
): Promise<CreatePostResponse> {
  const { title: rawTitle, content: rawContent } = getFormData(formData);
  const validatedFields = schema.safeParse({
    title: rawTitle,
    content: rawContent,
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
    await createPost(
      validatedFields.data.title,
      validatedFields.data.content,
      session.userId as string,
    );
  } catch (_err) {
    return {
      success: false,
      message: "Failed to create post",
    };
  }
  redirect("/");
}

export async function handleVote(
  type: VoteType,
  postId: string,
): Promise<void> {
  const session = await getSession();
  if (!session?.userId) {
    redirect("/login");
  }
  const userId = session.userId as string;
  const existingVote = await findExistingVote(userId, postId);
  if (existingVote) {
    await deleteVote(existingVote.id);
    if (existingVote.type == type) return;
  }

  await createVote({ postId, userId, type });
}

export async function getVotes(postId: string): Promise<number> {
  const votes = await findAllVotes(postId);
  const numberOfUpvotes = votes.filter((vote) => vote.type === "UPVOTE").length;
  const numberOfDownvotes = votes.filter(
    (vote) => vote.type === "DOWNVOTE",
  ).length;
  return numberOfUpvotes - numberOfDownvotes;
}

export async function getUserVote(postId: string): Promise<number> {
  const session = await getSession();
  if (!session?.userId) {
    return 0;
  }
  const userId = session?.userId as string;
  const vote = await findUserVote(userId, postId);
  if (!vote) return 0;
  return vote.type === "UPVOTE" ? 1 : vote.type === "DOWNVOTE" ? -1 : 0;
}

export async function handleDeletePost(postId: string): Promise<void> {
  await deletePost(postId);
  redirect("/");
}
