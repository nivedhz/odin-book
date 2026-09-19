import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreatePostForm from "@/features/create/components/CreatePostForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const CreatePost = () => {
  return (
    <div className="flex items-center justify-center flex-1">
      <div className="">
        <div className="flex">
          <Link
            href={"/"}
            className="text-sm text-muted-foreground flex items-center gap-2 hover:text-foreground"
          >
            <ArrowLeft width={16} />
            Go back home
          </Link>
        </div>
        <Card className="min-w-150 min-h-80">
          <CardHeader>
            <CardTitle>Create a new post</CardTitle>
            <CardDescription>
              Share your thoughts with the world
            </CardDescription>
          </CardHeader>
          <CreatePostForm />
        </Card>
      </div>
    </div>
  );
};

export default CreatePost;
