import Post from "@/features/post/components/Post";
import { getAllPosts } from "@/features/home/queries";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "The latest posts from everyone on Odin Book.",
};

export default async function Home() {
  const posts = await getAllPosts();
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-6 sm:px-6">
      <h1 className="text-xl font-semibold tracking-tight text-balance">
        Latest Posts
      </h1>
      {posts.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card px-6 py-12 text-center">
          <p className="font-medium">No posts yet…</p>
          <p className="text-sm text-muted-foreground">
            Be the first to share what&apos;s on your mind.
          </p>
          <Link href="/create" className={buttonVariants()}>
            Write a post
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
