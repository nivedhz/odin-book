import UsersGrid from "@/features/users/components/UsersGrid";
import { getAllUsers } from "@/features/users/queries";
import { getSession } from "@/lib/auth/session";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getSession();
  if (!session?.userId) {
    redirect("/login");
  }
  const users = await getAllUsers(session.userId as string);
  return (
    <main className="py-4">
      <div className="px-20 flex flex-col gap-4 items-center">
        <div className="">
          <ul className="flex gap-4 items-center ">
            <li className="hover:bg-muted-foreground/40 px-2 py-1 rounded-full">
              <Link href="/" className="text-sm text-foreground">
                Posts
              </Link>
            </li>
            <li className="bg-foreground px-2 py-1 rounded-full">
              <Link href="/users" className="text-sm text-background ">
                Users
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          {users.map((user) => {
            return <UsersGrid key={user.id} user={user} />;
          })}
        </div>
      </div>
    </main>
  );
};

export default page;
