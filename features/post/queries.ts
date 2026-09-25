import { prisma } from "@/lib/prisma";
import { Post } from "../home/types";
import { Comment } from "./types";

export async function findPost(postId: string): Promise<Post | null> {
  return await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      author: {
        select: {
          username: true,
        },
      },
    },
  });
}

export async function findComments(postId: string) {
  return await prisma.comment.findMany({
    where: {
      postId,
    },
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

export async function createComment(
  content: string,
  authorId: string,
  postId: string,
): Promise<Comment> {
  return await prisma.comment.create({
    data: {
      content,
      authorId,
      postId,
    },
  });
}
