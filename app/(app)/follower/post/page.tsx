import Post from "@/features/post/components/Post";
import { getAllFollowingPosts } from "@/features/post/queries";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Following",
  description: "Posts from readers you follow on Booko.",
};

const page = async () => {
  const session = await getSession();
  if (!session?.userId) {
    redirect("/login");
  }
  const posts = await getAllFollowingPosts(session.userId as string);
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6">
      <h1 className="font-serif text-2xl font-semibold tracking-tight text-balance">
        Following
      </h1>
      {posts.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
          You don&apos;t have any follower posts
        </p>
      ) : (
        <div className="mt-4 flex flex-col gap-4">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
};

export default page;
