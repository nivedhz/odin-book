"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";
import { handlePostEdit } from "../actions";
import { Post } from "@/features/home/types";

const PostEditForm = ({ post }: { post: Post }) => {
  const [state, action, _pending] = useActionState(handlePostEdit, {
    message: "",
    success: false,
  });

  return (
    <form action={action} aria-label="Create Post form">
      <CardContent>
        <div className="flex flex-col gap-2">
          <Input type="text" name="postId" hidden value={post.id} />
          <div className="flex flex-col gap-1">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="The title of what's on your mind"
              name="title"
              defaultValue={post.title}
              required
            />
          </div>
          <div className="flex flex-col gap-1 pb-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              className="resize-none scrollbar-none max-w-150 min-h-50"
              placeholder="What's on your mind?"
              name="content"
              defaultValue={post.content}
              required
            />
          </div>
          {state?.message && (
            <p className={state.success ? "text-green-500" : "text-red-500"}>
              {state.message}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-row-reverse">
        <Button type="submit" className="btn btn-primary px-4 py-2">
          Edit
        </Button>
      </CardFooter>
    </form>
  );
};

export default PostEditForm;
