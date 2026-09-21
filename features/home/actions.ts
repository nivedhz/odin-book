"use server";
import { deleteSession, getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function handleLogout(): Promise<void> {
  await deleteSession();
  redirect("/login");
}

export async function handleUpvote(postId: string): Promise<void> {
  const session = await getSession();
  if (!session?.userId) {
    redirect("/login");
  }
  const userId = session.userId as string;
  const existingUpvote = await prisma.vote.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
      type: "UPVOTE",
    },
  });
  const existingDownvote = await prisma.vote.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
      type: "DOWNVOTE",
    },
  });
  if (existingUpvote) {
    await prisma.vote.delete({
      where: {
        id: existingUpvote.id,
        type: "UPVOTE",
      },
    });
    return;
  } else if (existingDownvote) {
    await prisma.vote.delete({
      where: {
        id: existingDownvote.id,
        type: "DOWNVOTE",
      },
    });
  }

  await prisma.vote.create({
    data: {
      postId,
      userId,
      type: "UPVOTE",
    },
  });
}

export async function handleDownvote(postId: string): Promise<void> {
  const session = await getSession();
  if (!session?.userId) {
    redirect("/login");
  }
  const userId = session.userId as string;
  const existingDownvote = await prisma.vote.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
      type: "DOWNVOTE",
    },
  });
  const existingUpvote = await prisma.vote.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
      type: "UPVOTE",
    },
  });
  if (existingDownvote) {
    await prisma.vote.delete({
      where: {
        id: existingDownvote.id,
        type: "DOWNVOTE",
      },
    });
    return;
  } else if (existingUpvote) {
    await prisma.vote.delete({
      where: {
        id: existingUpvote.id,
        type: "UPVOTE",
      },
    });
  }
  await prisma.vote.create({
    data: {
      postId,
      userId,
      type: "DOWNVOTE",
    },
  });
}

async function getNumberOfUpvotes(postId: string): Promise<number> {
  const session = await getSession();
  if (!session?.userId) {
    redirect("/login");
  }
  const numberOfUpvotes = await prisma.vote.findMany({
    where: {
      postId,
      type: "UPVOTE",
    },
  });
  return numberOfUpvotes.length;
}

async function getNumberOfDownvotes(postId: string): Promise<number> {
  const session = await getSession();
  if (!session?.userId) {
    redirect("/login");
  }
  const numberOfDownvotes = await prisma.vote.findMany({
    where: {
      postId,
      type: "DOWNVOTE",
    },
  });
  return numberOfDownvotes.length;
}

export async function getVotes(postId: string): Promise<number> {
  const numberOfUpvotes = await getNumberOfUpvotes(postId);
  const numberOfDownvotes = await getNumberOfDownvotes(postId);
  return numberOfUpvotes - numberOfDownvotes;
}

export async function getUserVote(postId: string): Promise<number> {
  const session = await getSession();
  if (!session?.userId) {
    redirect("/login");
  }
  const userId = session.userId as string;
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
