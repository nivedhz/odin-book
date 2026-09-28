"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    <form action={action} className="flex flex-col gap-4">
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          placeholder="Choose a username…"
          name="username"
          defaultValue={user.username}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com…"
          name="email"
          defaultValue={user.email}
        />
      </div>
      {state.message && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}
      <Button type="submit" className="w-full">
        Save
      </Button>
    </form>
  );
};

export default ProfileEditForm;
