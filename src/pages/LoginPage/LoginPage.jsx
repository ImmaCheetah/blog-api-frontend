import styles from "./LoginPage.module.css";
import { useState, useEffect } from "react";
import { useAuth } from "../../components/AuthProvider/AuthProvider";
import { NavLink } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const auth = useAuth();
  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const username = form.get("username");
    const password = form.get("password");

    auth.loginFetch(username, password);
  }

  return (
    <>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="username"></label>
        <input
          type="text"
          name="username"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password"></label>
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
        <p>{auth.error && auth.error.errorMsg}</p>
        <p>
          Don&apos;t have an account? <NavLink to="/sign-up">Sign Up</NavLink>
        </p>
      </form>
    </>
  );
}
