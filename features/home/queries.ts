import { prisma } from "@/lib/prisma";
import { Post, Vote } from "./types";

export async function getAllPosts(): Promise<Post[]> {
  return await prisma.post.findMany({
    include: {
      author: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
export async function findExistingVote(
  userId: string,
  postId: string,
): Promise<Vote | null> {
  return await prisma.vote.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });
}

export async function deleteVote(voteId: string | undefined): Promise<void> {
  await prisma.vote.delete({
    where: {
      id: voteId,
    },
  });
}

export async function createVote(vote: Vote): Promise<void> {
  await prisma.vote.create({
    data: {
      postId: vote.postId,
      userId: vote.userId,
      type: vote.type,
    },
  });
}
export async function findAllVotes(postId: string): Promise<Vote[]> {
  return await prisma.vote.findMany({
    where: {
      postId,
    },
  });
}
export async function findUserVote(
  userId: string,
  postId: string,
): Promise<Vote | null> {
  return await prisma.vote.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });
}
