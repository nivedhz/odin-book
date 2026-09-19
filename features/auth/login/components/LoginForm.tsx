"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleLogin } from "../actions";

const LoginForm = () => {
  const [state, action, _pending] = useActionState(handleLogin, {
    success: false,
    message: "",
  });
  return (
    <>
      <form action={action} aria-label="Login form">
        <CardContent>
          <div className="flex flex-col gap-2 pb-4">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="johndoe@example.com"
                  name="email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="········"
                  required
                />
              </div>
            </div>
            {state.message && (
              <p className="text-red-600 text-sm">{state.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
        </CardFooter>
      </form>
    </>
  );
};

export default LoginForm;
