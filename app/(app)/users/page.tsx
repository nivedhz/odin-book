import UsersGrid from "@/features/users/components/UsersGrid";
import { getAllUsers } from "@/features/users/queries";
import { getSession } from "@/lib/auth/session";
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
