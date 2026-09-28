"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";
import { handleCreatePost } from "../actions";

const CreatePostForm = () => {
  const [state, action, _pending] = useActionState(handleCreatePost, {
    success: false,
    message: "",
  });
  return (
    <form
      action={action}
      aria-label="Create Post form"
      className="flex min-h-[60vh] flex-col"
    >
      <Label htmlFor="title" className="sr-only">
        Title
      </Label>
      <Input
        id="title"
        placeholder="Headline…"
        name="title"
        required
        className="h-auto border-0 bg-transparent px-0 py-2 font-serif text-3xl font-semibold tracking-tight placeholder:font-sans placeholder:text-2xl placeholder:font-normal placeholder:text-muted-foreground/60 focus-visible:ring-0 md:text-4xl dark:bg-transparent"
      />
      <Separator className="my-4" />
      <Label htmlFor="content" className="sr-only">
        Content
      </Label>
      <Textarea
        id="content"
        className="min-h-72 flex-1 border-0 bg-transparent px-0 py-2 text-base leading-relaxed placeholder:text-muted-foreground/60 focus-visible:ring-0 md:text-lg dark:bg-transparent"
        placeholder="Begin writing…"
        name="content"
        required
      />
      <div className="sticky bottom-0 flex items-center justify-between gap-4 border-t border-border bg-background/85 py-4 backdrop-blur">
        <div aria-live="polite" className="min-w-0 flex-1">
          {state?.message && (
            <p
              className={
                state.success
                  ? "truncate text-sm text-muted-foreground"
                  : "truncate text-sm text-destructive"
              }
            >
              {state.message}
            </p>
          )}
        </div>
        <Button type="submit" size="lg" className="rounded-full px-6">
          Create
        </Button>
      </div>
    </form>
  );
};

export default CreatePostForm;
