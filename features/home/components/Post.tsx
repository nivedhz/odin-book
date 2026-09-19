import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Post } from "../types";
import { format } from "timeago.js";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import VoteButtonGroup from "./VoteButtonGroup";

interface Props {
  post: Post;
}

const Post = ({ post }: Props) => {
  return (
    <Card className="min-w-150">
      <CardHeader className="flex gap-2 items-center">
        <Avatar>
          <AvatarFallback>{post.author.username[0]}</AvatarFallback>
        </Avatar>
        <p className="text-lg font-semibold text-muted-foreground">
          u/{post.author.username}
        </p>
        &middot;
        <p className="text-sm text-muted-foreground">
          {format(post.createdAt)}
        </p>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-2xl font-bold">{post.title}</CardTitle>
        <CardDescription>{post.content}</CardDescription>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2">
          <VoteButtonGroup />
          <Button variant={"outline"}>
            <MessageCircle size={16} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Post;
