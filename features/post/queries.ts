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

export async function updatePost(title: string, content: string, id: string) {
  return await prisma.post.update({
    where: {
      id,
    },
    data: {
      title,
      content,
    },
  });
}

export async function getAllFollowerPosts(followingId: string) {
  return await prisma.post.findMany({
    where: {
      author: {
        followers: {
          some: {
            followerId: followingId,
          },
        },
      },
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
