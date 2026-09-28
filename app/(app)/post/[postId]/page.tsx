import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUserVote, getVotes } from "@/features/post/actions";
import VoteButtonGroup from "@/features/post/components/VoteButtonGroup";
import CommentForm from "@/features/post/components/CommentForm";
import PostHeader from "@/features/post/components/PostHeader";
import { findComments, findPost } from "@/features/post/queries";
import { getSession } from "@/lib/auth/session";
import { ArrowLeft, Edit, EllipsisVertical, MessageCircle } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { format } from "timeago.js";
import type { Metadata } from "next";
import PostDeleteButton from "@/features/post/components/PostDeleteButton";

interface Props {
  params: Promise<{ postId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { postId } = await params;
  const post = await findPost(postId);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description:
      post.content.length > 160
        ? `${post.content.slice(0, 157)}…`
        : post.content,
  };
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
    <div className="mx-auto flex w-full max-w-3xl flex-col px-4 py-6 sm:px-6 sm:py-8">
      <Link
        href="/"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to feed
      </Link>

      <article aria-label={`Post ${post.title}`} className="mt-6 flex flex-col">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <PostHeader post={post} />
          </div>
          {post.authorId === session.userId && (
            <div className="flex items-center gap-2">
              <Link
                href={`/post/${post.id}/edit`}
                aria-label="Edit post"
                className={buttonVariants({ variant: "outline", size: "icon" })}
              >
                <Edit />
              </Link>
              <PostDeleteButton postId={post.id} />
            </div>
          )}
        </div>

        <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed wrap-break-word whitespace-pre-wrap text-foreground/90">
          {post.content}
        </p>

        <div className="mt-6 flex items-center gap-4 border-y border-border py-3">
          <VoteButtonGroup
            post={post}
            votes={noOfVotes}
            userVoteStatus={userVoteStatus}
          />
          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <MessageCircle className="size-4" aria-hidden="true" />
            <span className="tabular-nums">
              {comments.length} {comments.length === 1 ? "comment" : "comments"}
            </span>
          </span>
        </div>
      </article>

      <section aria-label="Comments" className="mt-8 flex flex-col">
        <h2 className="text-lg font-semibold tracking-tight">
          Comments{" "}
          <span className="text-sm font-normal text-muted-foreground tabular-nums">
            {comments.length}
          </span>
        </h2>
        <div className="mt-4">
          <CommentForm post={post} />
        </div>
        {comments.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-border bg-card px-6 py-8 text-center text-sm text-muted-foreground">
            No comments yet — start the conversation.
          </p>
        ) : (
          <div className="mt-2 flex flex-col divide-y divide-border">
            {comments.map((comment) => {
              return (
                <div
                  className="flex items-start justify-between gap-3 py-4"
                  key={comment.id}
                >
                  <div className="flex min-w-0 items-start gap-2.5">
                    <Avatar size="sm">
                      <AvatarFallback>
                        {comment.author.username[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex min-w-0 flex-col gap-1">
                      <div className="flex flex-wrap items-center gap-x-2 text-sm">
                        <p className="font-semibold">
                          u/{comment.author.username}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(comment.createdAt)}
                        </p>
                      </div>
                      <p className="text-sm leading-relaxed wrap-break-word whitespace-pre-wrap">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label="Comment options"
                        >
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
        )}
      </section>
      <Separator className="mt-8" />
    </div>
  );
};

export default Post;
