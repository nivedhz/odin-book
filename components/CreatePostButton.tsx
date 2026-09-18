"use client";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

const CreatePostButton = () => {
  return (
    <Button
      variant={"ghost"}
      className={"flex items-center gap-2"}
      aria-label="Create Post"
      onClick={() => {
        redirect("/create");
      }}
    >
      <Plus />
      Create
    </Button>
  );
};

export default CreatePostButton;
