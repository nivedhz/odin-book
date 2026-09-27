import { prisma } from "@/lib/prisma";

export async function getAllUsers(userId: string) {
  return await prisma.user.findMany({
    where: {
      NOT: {
        id: userId,
      },
    },
  });
}
