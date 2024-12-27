import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState();
  const [error, setError] = useState();
  let navigate = useNavigate();

  function redirectUser() {
    navigate('/', {replace: true})
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const username = form.get("username");
    const password = form.get("password");
    
    loginFetch(username, password);
    redirectUser();
  }

  function loginFetch(username, password) {
    fetch('http://localhost:8080/user/login', {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response.status >= 400) {
        throw new Error("server error");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      setToken(data);
      localStorage.setItem("JWT", data.token)
    })
    .catch((error) => setError(error))
  }

  return (
    <>
      <h1>LOGIN PAGE</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} required/>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required/>
        <button type="submit">Log In</button>
      </form>
    </>
  );
}