import UsersGrid from "@/features/users/components/UsersGrid";
import { getAllUsers } from "@/features/users/queries";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "People",
  description: "Everyone reading on Booko.",
};

const page = async () => {
  const session = await getSession();
  if (!session?.userId) {
    redirect("/login");
  }
  const users = await getAllUsers(session.userId as string);
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6">
      <h1 className="font-serif text-2xl font-semibold tracking-tight text-balance">
        People
      </h1>
      {users.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
          No readers here yet.
        </p>
      ) : (
        <div className="mt-4 flex flex-col gap-4">
          {users.map((user) => {
            return <UsersGrid key={user.id} user={user} />;
          })}
        </div>
      )}
    </main>
  );
};

export default page;
