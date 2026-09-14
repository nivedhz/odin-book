"use client";

import { useActionState } from "react";
import { handleLogin } from "../actions";

const LoginForm = () => {
  const [state, action, _pending] = useActionState(handleLogin, {
    success: false,
    message: "",
  });
  return (
    <form action={action}>
      <p>{state.message}</p>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
