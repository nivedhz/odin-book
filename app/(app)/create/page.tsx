import type { Metadata } from "next";
import CreatePostForm from "@/features/post/components/CreatePostForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create post",
  description: "Share what's on your mind with the Booko reading room.",
};

const CreatePost = () => {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col px-4 py-6 sm:px-6 sm:py-8">
      <Link
        href="/"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to feed
      </Link>
      <div className="mt-6">
        <CreatePostForm />
      </div>
    </div>
  );
};

export default CreatePost;
