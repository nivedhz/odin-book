import { prisma } from "@/lib/prisma";
import { User } from "./types";

export async function getUser(email: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}
