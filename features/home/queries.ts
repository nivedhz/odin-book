import { prisma } from "@/lib/prisma";
import { Post } from "@/features/post/types";

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
