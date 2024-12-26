export default function LoginPage() {
  return (
    <>
      <h1>LOGIN PAGE</h1>
      <form action="http://localhost:8080/user/login" method="POST">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" required/>
        <label htmlFor="password">Password</label>
        <input type="password" name="password"  required/>
        <button type="submit">Log In</button>
      </form>
    </>
  );
}