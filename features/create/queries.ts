import { prisma } from "@/lib/prisma";

export async function createPost(
  title: string,
  content: string,
  authorId: string,
) {
  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId,
    },
  });

  return post;
}
