import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getProfile,
  getUserComments,
  getUserPosts,
} from "@/features/profile/queries";
import { getSession } from "@/lib/auth/session";
import { Edit } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    <div className="flex items-center justify-center flex-1">
      <Card className="min-w-150">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          {session?.userId === user.id && (
            <Link href={`/profile/${user.id}/edit`}>
              <CardAction>
                <Button size={"icon"} variant={"outline"}>
                  <Edit />
                </Button>
              </CardAction>
            </Link>
          )}
        </CardHeader>
        <CardContent>
          <p>Username: u/{user.username}</p>
          <p>Email: {user.email}</p>
        </CardContent>
        <h1>Posts: </h1>
        {posts.map((post) => {
          return (
            <div key={post.id}>
              <Link href={`/post/${post.id}`}>
                <p className="truncate max-w-20"> {post.title}</p>
              </Link>
            </div>
          );
        })}
        <h1>Comments:</h1>
        {comments.map((comment) => {
          return (
            <div key={comment.id}>
              <Link href={`/post/${comment.postId}`}>
                <p className="truncate max-w-20"> {comment.content}</p>
              </Link>
            </div>
          );
        })}
      </Card>
    </div>
  );
};

export default page;
