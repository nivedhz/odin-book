import Post from "@/features/home/components/Post";
import { getAllFollowingPosts } from "@/features/post/queries";
import { getSession } from "@/lib/auth/session";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getSession();
  if (!session?.userId) {
    redirect("/login");
  }
  const posts = await getAllFollowingPosts(session.userId as string);
  return (
    <main className="py-4">
      <div className="px-20 flex flex-col gap-4 items-center">
        <div className="">
          <ul className="flex gap-4">
            <Link href="/" className="text-sm text-muted-foreground ">
              <li className="hover:bg-muted-foreground/40 px-2 py-1 rounded-full">
                Posts
              </li>
            </Link>
            <Link href="/users" className="text-sm text-muted-foreground ">
              <li className="hover:bg-muted-foreground/40 px-2 py-1 rounded-full">
                Users
              </li>
            </Link>
            <Link href="/follower/post" className="text-sm text-background ">
              <li className="bg-foreground px-2 py-1 rounded-full">
                Followers
              </li>
            </Link>
          </ul>
        </div>
        {posts.length === 0 ? (
          <p className="text-muted-foreground">
            You don&apos;t have any follower posts
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default page;
