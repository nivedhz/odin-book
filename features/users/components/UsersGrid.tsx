import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import FollowButton from "@/features/users/components/FollowButton";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { isFollowing } from "../queries";
import { User } from "../types";
import UserFollowersCount from "./UserFollowersCount";

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
      className="min-w-150 p-4 flex items-center gap-4 bg-card rounded-2xl justify-between"
    >
      <div className="flex gap-4 items-center">
        <div className="">
          <Avatar>
            <AvatarFallback>{user.username[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col">
          <div className="">
            <Link href={`/profile/${user.id}`}>
              <p
                className="text-lg font-semibold hover:text-muted-foreground"
                aria-label={`Post Author ${user.username}`}
              >
                u/{user.username}
              </p>
            </Link>
          </div>
          <UserFollowersCount user={user} />
        </div>
      </div>
      <div className="">
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
