import type { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProfileEditForm from "@/features/profile/components/ProfileEditForm";
import { getProfile } from "@/features/profile/queries";
import { getSession } from "@/lib/auth/session";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit profile",
  description: "Update your Booko reading room profile.",
};

interface Props {
  params: Promise<{ userId: string }>;
}

const ProfileEdit = async ({ params }: Props) => {
  const { userId } = await params;
  const user = await getProfile(userId);
  const session = await getSession();
  if (!user || session?.userId !== userId) {
    return notFound();
  }
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col px-4 py-6 sm:px-6 sm:py-8">
      <Link
        href={`/profile/${userId}`}
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to profile
      </Link>
      <Card className="mt-6 w-full rounded-2xl">
        <CardHeader>
          <CardTitle className="font-serif text-2xl font-semibold tracking-tight">
            Edit profile
          </CardTitle>
          <CardDescription>
            Update how you appear in the reading room.
          </CardDescription>
          <CardAction>
            <Link
              href={`/profile/${userId}`}
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Go to profile
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <ProfileEditForm user={user} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileEdit;
