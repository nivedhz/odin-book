"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Post } from "@/features/post/types";
import { Send } from "lucide-react";
import { useActionState } from "react";
import { handleComment } from "../actions";
interface Props {
  post: Post;
}

const CommentForm = ({ post }: Props) => {
  const [_state, action, _pending] = useActionState(handleComment, {
    success: false,
    message: "",
  });

  return (
    <form className="flex gap-2 min-w-full" action={action}>
      <Input placeholder="Write a comment" className="flex-1" name="comment" />
      <Input
        placeholder="Write a comment"
        className="flex-1"
        name="post"
        hidden
        value={post.id}
      />
      <Button type="submit" variant={"outline"}>
        <Send />
      </Button>
    </form>
  );
};

export default CommentForm;
