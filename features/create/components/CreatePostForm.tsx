"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";
import { handleCreatePost } from "../actions";

const CreatePostForm = () => {
  const [state, action, _pending] = useActionState(handleCreatePost, {
    success: false,
    message: "",
  });
  return (
    <form action={action} aria-label="Create Post form">
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="The title of what's on your mind"
              name="title"
              required
            />
          </div>
          <div className="flex flex-col gap-1 pb-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              className="h-60 resize-none scrollbar-none"
              placeholder="What's on your mind?"
              name="content"
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
        <Button type="submit" className="btn btn-primary px-4 py-2" size={"lg"}>
          Create
        </Button>
      </CardFooter>
    </form>
  );
};

export default CreatePostForm;
