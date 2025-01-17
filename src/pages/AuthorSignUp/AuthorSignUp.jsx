import { useState } from "react";
import styles from "./AuthorSignUp.module.css";
import { useAuth } from "../../components/AuthProvider/AuthProvider";
import 'dotenv/config'

export default function AuthorSignUp() {
  const auth = useAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const password = form.get("password");

    authorFetch(password);
  }

  async function authorFetch(password) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/author/sign-up`,
        {
          method: "POST",
          body: JSON.stringify({
            password: password,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: auth.token,
          },
        },
      );

      if (response.status >= 400) {
        const errors = await response.json();
        setError(errors.message);
      }

      if (response.status === 200) {
        const res = await response.json();
        window.open("https://www.google.com/", "_blank");
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {auth.token ? (
        <>
          <h2>Enter password to become an author</h2>
          <form className={styles.authorSignUpForm} onSubmit={handleSubmit}>
            <label htmlFor="password"></label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
          {error && <p>{error}</p>}
        </>
      ) : (
        <h2>You should not be here</h2>
      )}
    </>
  );
}
