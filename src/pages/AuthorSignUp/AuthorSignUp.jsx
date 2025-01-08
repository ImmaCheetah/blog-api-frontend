import { useState } from "react";
import styles from "./AuthorSignUp.module.css";
import { useAuth } from "../../components/AuthProvider/AuthProvider";

export default function AuthorSignUp() {
  const auth = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const password = form.get("password");

    window.open('https://www.youtube.com/', "_blank")
    authorFetch(password);
  }

  async function authorFetch(password) {
    try {
      const response = fetch(`http://localhost:8080/user/author/sign-up`, {
        method: 'POST',
        body: JSON.stringify({
          password: password,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth.token
        },
      })

      if (response.status === 400) {
        const errors = await response.json();
        setError(errors.errors);
      }

      if (response.status === 200) {
        const res = await response.json();
        console.log(res)
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {
        auth.user ?
        <>
          <h1>sign up for author</h1>
          <form className={styles.authorSignUpForm} onSubmit={handleSubmit}>
            <label htmlFor="password">Password</label>
            <input 
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </>
        :
        <h1>You should not be here</h1>
      }
      
    </>
  )
}