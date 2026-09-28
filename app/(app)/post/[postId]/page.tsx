import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUserVote, getVotes } from "@/features/post/actions";
import VoteButtonGroup from "@/features/post/components/VoteButtonGroup";
import CommentForm from "@/features/post/components/CommentForm";
import { findComments, findPost } from "@/features/post/queries";
import { getSession } from "@/lib/auth/session";
import { Edit, EllipsisVertical, MessageCircle } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { format, TDate } from "timeago.js";

interface Props {
  params: Promise<{ postId: string }>;
}

const Post = async ({ params }: Props) => {
  const session = await getSession();
  if (!session?.userId) {
    redirect("/login");
  }
  const { postId } = await params;
  const post = await findPost(postId);
  const comments = await findComments(postId);
  if (!post) {
    return notFound();
  }
  const noOfVotes = await getVotes(post.id);
  const userVoteStatus = await getUserVote(post.id);

  return (
    <div className="flex items-center justify-center py-5">
      <Card className="min-w-150">
        <CardHeader className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarFallback>{post.author?.username[0]}</AvatarFallback>
            </Avatar>
            <Link href={`/profile/${post.authorId}`}>
              <p
                className="text-lg font-semibold text-muted-foreground hover:text-foreground"
                aria-label={`Post Author ${post.author?.username}`}
              >
                u/{post.author?.username}
              </p>
            </Link>
            &middot;
            <p
              className="text-sm text-muted-foreground"
              aria-label={`Post Created at ${format(post.createdAt as TDate)}`}
            >
              {format(post.createdAt as TDate)}
            </p>
          </div>
          {post.authorId === session.userId && (
            <CardAction>
              <Link href={`/post/${post.id}/edit`}>
                <Button variant={"outline"}>
                  <Edit />
                </Button>
              </Link>
            </CardAction>
          )}
        </CardHeader>
        <CardContent className="max-w-150 flex flex-col gap-2">
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>{post.content}</CardDescription>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 items-start">
          <div className="flex items-center gap-2">
            <VoteButtonGroup
              post={post}
              votes={noOfVotes}
              userVoteStatus={userVoteStatus}
            />
            <Link href={`/post/${post.id}`}>
              <Button
                variant={"outline"}
                aria-label={`Comment on ${post.title}`}
              >
                <MessageCircle size={16} />
              </Button>
            </Link>
          </div>
          <CardTitle>Comments</CardTitle>
          <CommentForm post={post} />
          <div className="flex flex-col gap-4 w-full">
            {comments.map((comment) => {
              return (
                <div
                  className="flex items-start gap-2 justify-between"
                  key={comment.id}
                >
                  <div className="flex items-start gap-2">
                    <Avatar>
                      <AvatarFallback>
                        {comment.author.username[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="flex gap-2 text-muted-foreground">
                        <p>u/{comment.author.username}</p>
                        <p>&middot;</p>
                        <p>{format(comment.createdAt)}</p>
                      </div>
                      <div className="pl-1 flex gap-2">
                        <p>{comment.content}</p>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button variant={"ghost"} className={"rounded-full"}>
                          <EllipsisVertical />
                        </Button>
                      }
                    />
                    <DropdownMenuContent>
                      <DropdownMenuItem>Report</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              );
            })}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Post;
