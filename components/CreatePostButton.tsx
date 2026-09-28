"use client";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const CreatePostButton = () => {
  const router = useRouter();
  return (
    <Button
      variant={"ghost"}
      className={"flex items-center gap-2"}
      aria-label="Create Post"
      onClick={() => {
        router.push("/create");
      }}
    >
      <Plus />
      Create
    </Button>
  );
};

export default CreatePostButton;
