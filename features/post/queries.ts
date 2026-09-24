import { prisma } from "@/lib/prisma";
import { Post } from "../home/types";

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
