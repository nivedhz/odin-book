import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProfileEditForm from "@/features/profile/components/ProfileEditForm";
import { getProfile } from "@/features/profile/queries";
import { getSession } from "@/lib/auth/session";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    <div className="flex flex-col min-h-screen items-center justify-center">
      <Card className="min-w-100">
        <CardHeader>
          <CardTitle>Profile Edit</CardTitle>
          <Link href={`/profile/${userId}`}>
            <CardAction>Go to profile</CardAction>
          </Link>
        </CardHeader>
        <CardContent>
          <ProfileEditForm user={user} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileEdit;
