"use server";
import { deleteSession, getSession } from "@/lib/auth/session";
import { Prisma } from "@/lib/generated/prisma/client";
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
  try {
    await prisma.vote.create({
      data: {
        postId,
        userId,
        type: "UPVOTE",
      },
    });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      await prisma.vote.deleteMany({
        where: {
          postId,
          userId,
          type: "UPVOTE",
        },
      });
    }
  }
}

export async function handleDownvote(postId: string): Promise<void> {
  const session = await getSession();
  if (!session?.userId) {
    redirect("/login");
  }
  const userId = session.userId as string;
  try {
    await prisma.vote.create({
      data: {
        postId,
        userId,
        type: "DOWNVOTE",
      },
    });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      await prisma.vote.deleteMany({
        where: {
          postId,
          userId,
          type: "DOWNVOTE",
        },
      });
    }
  }
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
  const numberOfDownvotes = await prisma.vote.count({
    where: {
      postId,
      type: "DOWNVOTE",
    },
  });
  return numberOfDownvotes;
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
  });
  if (!vote) return 0;
  return vote?.type === "UPVOTE" ? 1 : -1;
}
