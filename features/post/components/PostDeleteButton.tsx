"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { handleDeletePost } from "../actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const PostDeleteButton = ({ postId }: { postId: string }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            aria-label="Delete post"
            className={buttonVariants({ variant: "outline", size: "icon" })}
          >
            <Trash className="text-foreground" />
          </Button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want to delete this post?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant={"destructive"}
            onClick={() => {
              handleDeletePost(postId);
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PostDeleteButton;
