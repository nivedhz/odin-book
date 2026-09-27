"use client";

import { User } from "../types";

interface Props {
  user: User;
}

const UserFollowersCount = ({ user }: Props) => {
  return (
    <div className="">
      <p
        className="text-sm text-muted-foreground"
        aria-label={`Post Created at ${user.email}`}
      >
        {user.followers.length} Followers
      </p>
    </div>
  );
};

export default UserFollowersCount;
