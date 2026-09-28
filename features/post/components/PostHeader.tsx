import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CardHeader } from "@/components/ui/card";
import { format } from "timeago.js";
import { Post } from "../types";
import Link from "next/link";

type Props = {
  post: Post;
};
const PostHeader = ({ post }: Props) => {
  const username = post.author?.username ?? "Deleted user";
  const createdAt = post.createdAt ? format(post.createdAt) : "unknown";
  return (
    <CardHeader className="flex items-center gap-2">
      <Avatar size="sm">
        <AvatarFallback>{username[0]?.toUpperCase()}</AvatarFallback>
      </Avatar>
      <Link href={`/profile/${post.authorId}`}>
        <p
          className="text-sm font-semibold text-muted-foreground hover:text-foreground"
          aria-label={`Post Author ${username}`}
        >
          u/{username}
        </p>
      </Link>
      <p
        className="text-xs text-muted-foreground"
        aria-label={`Post Created at ${createdAt}`}
      >
        {createdAt}
      </p>
    </CardHeader>
  );
};

export default PostHeader;
