import { prisma } from "@/lib/prisma";
import { Comment, Post } from "./types";

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

export async function getAllFollowingPosts(followerId: string) {
  return await prisma.post.findMany({
    where: {
      author: {
        followers: {
          some: {
            followerId: followerId,
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

export async function createPost(
  title: string,
  content: string,
  authorId: string,
): Promise<Post | null> {
  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId,
    },
  });

  return post;
}
