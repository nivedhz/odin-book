import Post from "@/features/home/components/Post";
import { getAllPosts } from "@/features/home/queries";

export default async function Home() {
  const posts = await getAllPosts();
  return (
    <main className="pt-4">
      <div className="px-20 flex flex-col gap-4 items-center">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
