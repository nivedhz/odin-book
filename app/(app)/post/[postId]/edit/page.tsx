import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import PostEditForm from "@/features/post/components/PostEditForm";
import { findPost } from "@/features/post/queries";
import { getSession } from "@/lib/auth/session";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: Promise<{ postId: string }>;
}

const PostEdit = async ({ params }: Props) => {
  const { postId } = await params;
  const session = await getSession();
  if (!session?.userId) {
    redirect("/login");
  }
  const post = await findPost(postId);
  if (!post) {
    return notFound();
  }

  if (post.authorId !== session.userId) {
    return notFound();
  }
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <Card className="min-w-150">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Edit Post</CardTitle>
        </CardHeader>
        <PostEditForm post={post} />
      </Card>
    </div>
  );
};

export default PostEdit;
