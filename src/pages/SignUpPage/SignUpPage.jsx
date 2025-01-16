import styles from "./SignUpPage.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../Hooks/useForm";


export default function SignUpPage() {
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState([]);
  const {values, errors, handleChange} = useForm();

  let navigate = useNavigate();

  function redirectUser() {
    navigate("/login", { replace: true });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const username = form.get("username");
    const email = form.get("email");
    const password = form.get("password");
    const confirmPassword = form.get("confirmPassword");

    const formJson = Object.fromEntries(form.entries());
    console.log(formJson);

    signUpFetch(username, email, password, confirmPassword);
  }

  async function signUpFetch(username, email, password, confirmPassword) {
    try {
      const response = await fetch("http://localhost:8080/user/sign-up", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 400) {
        const errors = await response.json();
        setError(errors.errors);
      }

      if (response.status === 200) {
        redirectUser();
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log('Form errors', errors);

  return (
    <>
      <form className={styles.signUpForm} onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label htmlFor="username"></label>
        <input
          type="text"
          name="username"
          // value={username}
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <label htmlFor="email"></label>
        <input
          type="email"
          name="email"
          // value={email}
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <label htmlFor="password"></label>
        <input
          type="password"
          name="password"
          // value={password}
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <label htmlFor="confirmPassword"></label>
        <input
          type="password"
          name="confirmPassword"
          // value={confirmPassword}
          placeholder="Confirm Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {error &&
        error.map((err, index) => {
          return <p key={index}>{err.msg}</p>;
        })}
    </>
  );
}
