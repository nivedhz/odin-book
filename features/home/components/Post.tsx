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
import { getVotes, isUserDownvoted, isUserUpvoted } from "../actions";

interface Props {
  post: Post;
}

const Post = async ({ post }: Props) => {
  const noOfVotes = await getVotes(post.id);
  const userUpvoteStatus = await isUserUpvoted(post.id);
  const userDownvoteStatus = await isUserDownvoted(post.id);
  return (
    <article>
      <Card className="w-150">
        <PostHeader post={post} />
        <CardContent>
          <CardTitle className="text-2xl font-bold truncate">
            {post.title}
          </CardTitle>
          <CardDescription className="truncate">{post.content}</CardDescription>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-2">
            <VoteButtonGroup
              post={post}
              votes={noOfVotes}
              userUpvoteStatus={userUpvoteStatus}
              userDownvoteStatus={userDownvoteStatus}
            />
            <Button variant={"outline"}>
              <MessageCircle size={16} />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </article>
  );
};

export default Post;
