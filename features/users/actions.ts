"use server";

import { follow, unfollow } from "./queries";

export async function handleFollow(followerId: string, followingId: string) {
  try {
    await follow(followerId, followingId);
    return {
      message: "Followed",
      success: true,
    };
  } catch (_err) {
    return {
      message: "Something went wrong",
      success: false,
    };
  }
}
export async function handleUnfollow(followerId: string, followingId: string) {
  try {
    await unfollow(followerId, followingId);
    return {
      message: "Unfollowed",
      success: true,
    };
  } catch (_err) {
    return {
      message: "Something went wrong",
      success: false,
    };
  }
}
