import { prisma } from "@/lib/prisma";
import { User, UserData } from "./types";

export async function getProfile(userId: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    omit: {
      password: true,
    },
  });
}

export async function updateProfile(
  userId: string,
  data: UserData,
): Promise<User> {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      username: data.username,
      email: data.email,
    },
  });
}

export async function getUserPosts(userId: string) {
  return await prisma.post.findMany({
    where: {
      authorId: userId,
    },
  });
}

export async function getUserComments(userId: string) {
  return await prisma.comment.findMany({
    where: {
      authorId: userId,
    },
  });
}
