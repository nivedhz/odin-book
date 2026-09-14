"use client";

import { useActionState } from "react";
import { handleSignUp } from "../actions";
import Link from "next/link";

const SignUpForm = () => {
  const [state, action, _pending] = useActionState(handleSignUp, {
    success: false,
    message: "",
  });
  return (
    <>
      <Link href={"/"}>Home</Link>
      <form action={action}>
        <p>{state.message}</p>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default SignUpForm;
