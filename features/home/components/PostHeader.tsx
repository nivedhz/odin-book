import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CardHeader } from "@/components/ui/card";
import { format } from "timeago.js";
import { Post } from "../types";

type Props = {
  post: Post;
};
const PostHeader = ({ post }: Props) => {
  return (
    <CardHeader className="flex gap-2 items-center">
      <Avatar>
        <AvatarFallback>{post.author.username[0]}</AvatarFallback>
      </Avatar>
      <p
        className="text-lg font-semibold text-muted-foreground"
        aria-label={`Post Author ${post.author.username}`}
      >
        u/{post.author.username}
      </p>
      &middot;
      <p
        className="text-sm text-muted-foreground"
        aria-label={`Post Created at ${format(post.createdAt)}`}
      >
        {format(post.createdAt)}
      </p>
    </CardHeader>
  );
};

export default PostHeader;
