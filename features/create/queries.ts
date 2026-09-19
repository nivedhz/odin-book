import { prisma } from "@/lib/prisma";
import { Post } from "./types";

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
