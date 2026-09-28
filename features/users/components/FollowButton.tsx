"use client";

import { Button } from "@/components/ui/button";
import { handleFollow, handleUnfollow } from "../actions";
import { useState } from "react";

interface Props {
  followerId: string;
  followingId: string;
  followingStatus: boolean;
}

const FollowButton = ({ followerId, followingId, followingStatus }: Props) => {
  const [following, setFollowing] = useState(followingStatus);
  return (
    <Button
      onClick={async () => {
        setFollowing((prev) => !prev);
        if (followingStatus) {
          return await handleUnfollow(followerId, followingId);
        } else {
          return await handleFollow(followerId, followingId);
        }
      }}
      variant={following ? "outline" : "default"}
      className="shrink-0 cursor-pointer"
    >
      {following ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowButton;
