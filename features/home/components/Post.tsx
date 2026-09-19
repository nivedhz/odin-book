import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import type { Post } from "../types";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import VoteButtonGroup from "./VoteButtonGroup";
import PostHeader from "./PostHeader";

interface Props {
  post: Post;
}

const Post = ({ post }: Props) => {
  return (
    <Card className="min-w-150">
      <PostHeader post={post} />
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
