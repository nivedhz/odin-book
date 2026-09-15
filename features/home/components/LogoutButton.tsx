"use client";

import { handleLogout } from "../actions";

const LogoutButton = () => {
  return <button onClick={handleLogout}>logout</button>;
};

export default LogoutButton;
