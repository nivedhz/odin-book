import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import FollowButton from "@/features/users/components/FollowButton";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { isFollowing } from "../queries";
import { User } from "../types";

interface Props {
  user: User;
}

const UsersGrid = async ({ user }: Props) => {
  const session = await getSession();
  if (!session?.userId) {
    redirect("/login");
  }

  const followingStatus = await isFollowing(session.userId as string, user.id);
  return (
    <div
      key={user.id}
      className="flex w-full items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4"
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Avatar className="shrink-0">
          <AvatarFallback>
            {user.username[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <Link
            href={`/profile/${user.id}`}
            className="min-w-0 truncate text-base font-semibold transition-colors hover:text-muted-foreground"
            aria-label={`User ${user.username}`}
          >
            u/{user.username}
          </Link>
          <div className="flex min-w-0 items-center gap-2">
            <p
              className="truncate text-sm text-muted-foreground tabular-nums"
              aria-label={`Followers of ${user.username}`}
            >
              {user.followers.length} Followers
            </p>
            <span aria-hidden="true" className="text-muted-foreground">
              ·
            </span>
            <p
              className="truncate text-sm text-muted-foreground tabular-nums"
              aria-label={`Post count for ${user.username}`}
            >
              {user.posts.length} {user.posts.length === 1 ? "Post" : "Posts"}
            </p>
          </div>
        </div>
      </div>
      <div className="shrink-0">
        <FollowButton
          followingId={user.id}
          followerId={session.userId as string}
          followingStatus={!!followingStatus}
        />
      </div>
    </div>
  );
};

export default UsersGrid;
