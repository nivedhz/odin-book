const Login = () => {
  return (
    <form action="/login">
      <label htmlFor="email">Email</label>
      <input type="email" />
      <label htmlFor="password">Password</label>
      <input type="password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
