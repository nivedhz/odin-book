import { prisma } from "@/lib/prisma";
import { User } from "./types";

export async function getAllUsers(userId: string): Promise<User[]> {
  return await prisma.user.findMany({
    where: {
      NOT: {
        id: userId,
      },
    },
    omit: {
      password: true,
    },
    include: {
      followers: true,
    },
  });
}

export async function follow(followerId: string, followingId: string) {
  return await prisma.follow.create({
    data: {
      followerId,
      followingId,
    },
  });
}

export async function unfollow(followerId: string, followingId: string) {
  return await prisma.follow.delete({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  });
}

export async function findFollowers(followingId: string) {
  return await prisma.follow.findMany({
    where: {
      followingId,
    },
  });
}

export async function findFollowing(followerId: string) {
  return await prisma.follow.findMany({
    where: {
      followerId,
    },
  });
}

export async function isFollowing(followerId: string, followingId: string) {
  return await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  });
}
