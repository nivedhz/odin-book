"use server";
import { deleteSession, getSession } from "@/lib/auth/session";
import { VoteType } from "@/lib/generated/prisma/enums";
import { redirect } from "next/navigation";
import {
  createVote,
  deleteVote,
  findAllVotes,
  findExistingVote,
  findUserVote,
} from "./queries";

export async function handleLogout(): Promise<void> {
  await deleteSession();
  redirect("/login");
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
