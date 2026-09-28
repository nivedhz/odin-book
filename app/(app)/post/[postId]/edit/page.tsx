import type { Metadata } from "next";
import PostEditForm from "@/features/post/components/PostEditForm";
import { findPost } from "@/features/post/queries";
import { getSession } from "@/lib/auth/session";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit post",
  description: "Revise your post for the Booko reading room.",
};

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
    <div className="mx-auto flex w-full max-w-2xl flex-col px-4 py-6 sm:px-6 sm:py-8">
      <Link
        href={`/post/${postId}`}
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to post
      </Link>
      <div className="mt-6">
        <PostEditForm post={post} />
      </div>
    </div>
  );
};

export default PostEdit;
