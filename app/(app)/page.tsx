import Post from "@/features/home/components/Post";
import { getAllPosts } from "@/features/home/queries";
import Link from "next/link";

export default async function Home() {
  const posts = await getAllPosts();
  return (
    <main className="py-4">
      <div className="px-20 flex flex-col gap-4 items-center">
        <div className="">
          <ul className="flex gap-4">
            <li className="bg-foreground px-2 py-1 rounded-full">
              <Link href="/" className="text-sm text-background ">
                Posts
              </Link>
            </li>
            <li className="hover:bg-muted-foreground/40 px-2 py-1 rounded-full">
              <Link href="/users" className="text-sm text-muted-foreground ">
                Users
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
