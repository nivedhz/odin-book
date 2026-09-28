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
    <form
      className="flex w-full items-center gap-2"
      action={action}
      aria-label="Write a comment"
    >
      <Input
        placeholder="Write a comment…"
        className="flex-1"
        name="comment"
        aria-label="Write a comment"
        autoComplete="off"
      />
      <input type="hidden" name="post" value={post.id} />
      <Button type="submit" variant="outline" size="icon" aria-label="Send comment">
        <Send />
      </Button>
    </form>
  );
};

export default CommentForm;
