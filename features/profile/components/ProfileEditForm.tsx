"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { handleProfileEdit } from "../actions";
import { User } from "../types";

interface Props {
  user: User;
}

const ProfileEditForm = ({ user }: Props) => {
  const [state, action, _pending] = useActionState(handleProfileEdit, {
    message: "",
    success: false,
  });
  return (
    <form action={action} className="flex flex-col gap-2">
      <Input
        type="text"
        placeholder="Username"
        name="username"
        defaultValue={user.username}
      />
      <Input
        type="email"
        placeholder="Email"
        className="mb-4"
        name="email"
        defaultValue={user.email}
      />
      {state.message && <p>{state.message}</p>}
      <Button type="submit">Save</Button>
    </form>
  );
};

export default ProfileEditForm;
