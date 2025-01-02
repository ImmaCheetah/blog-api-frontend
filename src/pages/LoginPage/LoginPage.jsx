import { useState, useEffect } from 'react'
import { useAuth } from '../../components/AuthProvider/AuthProvider';
import { NavLink } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();

  const auth = useAuth();
  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const username = form.get("username");
    const password = form.get("password");
    
    auth.loginFetch(username, password);
  }

  // function loginFetch(username, password) {
  //   fetch('http://localhost:8080/user/login', {
  //     method: "POST",
  //     body: JSON.stringify({
  //       username: username,
  //       password: password,
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //   .then((response) => {
  //     if (response.status >= 400) {
  //       throw new Error("server error");
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     console.log(data);
  //     setToken(data);
  //     localStorage.setItem("JWT", data.token)
  //   })
  //   .catch((error) => setError(error))
  // }

  return (
    <>
      <h1>LOGIN PAGE</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} required/>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required/>
        <button type="submit">Log In</button>
        <p>Don't have an account? <NavLink to="/sign-up">Sign Up</NavLink></p>
      </form>
    </>
  );
}