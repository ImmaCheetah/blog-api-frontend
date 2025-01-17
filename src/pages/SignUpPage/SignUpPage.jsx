import styles from "./SignUpPage.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import { toast } from "react-toastify";
import 'dotenv/config'


export default function SignUpPage() {
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/sign-up`, {
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
        toast.success("Account created!", {
          position: "bottom-right",
        });
        redirectUser();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form className={styles.signUpForm} onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label htmlFor="username"></label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        {
          errors.username && <p>{errors.username}</p>
        }
        <label htmlFor="email"></label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        {
          errors.email && <p>{errors.email}</p>
        }
        <label htmlFor="password"></label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        {
          errors.password && <p>{errors.password}</p>
        }
        <label htmlFor="confirmPassword"></label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
        />
        {
          errors.confirmPassword && <p>{errors.confirmPassword}</p>
        }
        <button type="submit">Sign Up</button>
      </form>
      {error &&
        error.map((err, index) => {
          return <p key={index}>{err.msg}</p>;
        })}
    </>
  );
}
