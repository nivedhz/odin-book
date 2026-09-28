import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getProfile,
  getUserComments,
  getUserPosts,
} from "@/features/profile/queries";
import { getSession } from "@/lib/auth/session";
import { Edit } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "A reader's shelf on Booko — posts and comments.",
};

interface Props {
  params: Promise<{ userId: string }>;
}

const page = async ({ params }: Props) => {
  const { userId } = await params;
  const user = await getProfile(userId);
  const session = await getSession();
  if (!user) {
    return notFound();
  }
  const posts = await getUserPosts(user.id);
  const comments = await getUserComments(userId);
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6">
      <section
        aria-label="Profile"
        className="rounded-2xl border border-border bg-card p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <Avatar size="lg" className="shrink-0">
              <AvatarFallback>
                {user.username[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <h1 className="truncate font-serif text-2xl font-semibold tracking-tight text-balance">
                u/{user.username}
              </h1>
              <p className="truncate text-sm text-muted-foreground">
                {posts.length} {posts.length === 1 ? "post" : "posts"}
                {" · "}
                {comments.length}{" "}
                {comments.length === 1 ? "comment" : "comments"}
              </p>
            </div>
          </div>
          {session?.userId === user.id && (
            <Link
              href={`/profile/${user.id}/edit`}
              aria-label="Edit profile"
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "shrink-0",
              )}
            >
              <Edit />
            </Link>
          )}
        </div>
      </section>

      <section aria-label="Posts" className="mt-6 flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-balance">
          Posts{" "}
          <span className="text-sm font-normal text-muted-foreground tabular-nums">
            {posts.length}
          </span>
        </h2>
        {posts.length === 0 ? (
          <p className="rounded-2xl border border-border bg-card px-6 py-8 text-center text-sm text-muted-foreground">
            No posts on this shelf yet.
          </p>
        ) : (
          <div className="flex flex-col divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {posts.map((post) => {
              return (
                <Link
                  key={post.id}
                  href={`/post/${post.id}`}
                  className="flex min-w-0 items-center gap-2 px-4 py-3 transition-colors hover:bg-muted"
                >
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">
                    {post.title}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <section aria-label="Comments" className="mt-6 flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-balance">
          Comments{" "}
          <span className="text-sm font-normal text-muted-foreground tabular-nums">
            {comments.length}
          </span>
        </h2>
        {comments.length === 0 ? (
          <p className="rounded-2xl border border-border bg-card px-6 py-8 text-center text-sm text-muted-foreground">
            No comments in the margins yet.
          </p>
        ) : (
          <div className="flex flex-col divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {comments.map((comment) => {
              return (
                <Link
                  key={comment.id}
                  href={`/post/${comment.postId}`}
                  className="flex min-w-0 items-center gap-2 px-4 py-3 transition-colors hover:bg-muted"
                >
                  <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
                    {comment.content}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default page;
