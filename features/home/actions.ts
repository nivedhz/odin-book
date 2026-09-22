"use server";
import { deleteSession, getSession } from "@/lib/auth/session";
import { VoteType } from "@/lib/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

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
  const existingVote = await prisma.vote.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });
  if (existingVote) {
    await prisma.vote.delete({
      where: {
        id: existingVote.id,
      },
    });
    if (existingVote.type == type) return;
  }

  await prisma.vote.create({
    data: {
      postId,
      userId,
      type,
    },
  });
}

export async function getVotes(postId: string): Promise<number> {
  const votes = await prisma.vote.findMany({
    where: {
      postId,
    },
  });
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
  const vote = await prisma.vote.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
    include: { post: true },
  });
  if (!vote) return 0;
  return vote.type === "UPVOTE" ? 1 : vote.type === "DOWNVOTE" ? -1 : 0;
}
