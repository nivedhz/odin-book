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
import { getUserVote, getVotes } from "../actions";

interface Props {
  post: Post;
}

const Post = async ({ post }: Props) => {
  const noOfVotes = await getVotes(post.id);
  const userVoteStatus = await getUserVote(post.id);
  return (
    <article aria-label={`Post ${post.title}`}>
      <Card className="w-150">
        <PostHeader post={post} />
        <CardContent>
          <CardTitle
            className="text-2xl font-bold truncate"
            aria-label={`Post Title ${post.title}`}
            role="heading"
          >
            {post.title}
          </CardTitle>
          <CardDescription
            className="truncate"
            aria-label={`Post Content ${post.content}`}
          >
            {post.content}
          </CardDescription>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-2">
            <VoteButtonGroup
              post={post}
              votes={noOfVotes}
              userVoteStatus={userVoteStatus}
            />
            <Button variant={"outline"} aria-label={`Comment on ${post.title}`}>
              <MessageCircle size={16} />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </article>
  );
};

export default Post;
