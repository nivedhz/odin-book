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
import { getUserVote, getVotes } from "@/features/post/actions";
import Link from "next/link";

interface Props {
  post: Post;
}

const Post = async ({ post }: Props) => {
  const noOfVotes = await getVotes(post.id);
  const userVoteStatus = await getUserVote(post.id);
  return (
    <article aria-label={`Post ${post.title}`}>
      <Card className="w-full">
        <PostHeader post={post} />
        <Link href={`/post/${post.id}`}>
          <CardContent>
            <CardTitle
              className="truncate text-lg font-semibold tracking-tight"
              aria-label={`Post Title ${post.title}`}
              aria-level={2}
              role="heading"
            >
              {post.title}
            </CardTitle>
            <CardDescription
              className="line-clamp-3"
              aria-label={`Post Content ${post.content}`}
            >
              {post.content}
            </CardDescription>
          </CardContent>
        </Link>
        <CardFooter className="gap-2">
          <VoteButtonGroup
            post={post}
            votes={noOfVotes}
            userVoteStatus={userVoteStatus}
          />
          <Link href={`/post/${post.id}`}>
            <Button
              variant={"outline"}
              size={"icon"}
              aria-label={`Comment on ${post.title}`}
            >
              <MessageCircle size={16} />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </article>
  );
};

export default Post;
