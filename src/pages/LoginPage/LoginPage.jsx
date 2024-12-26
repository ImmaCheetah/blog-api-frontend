import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  function redirectUser() {
    navigate('/', {replace: true})
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const username = form.get("username");
    const password = form.get("password");
    
    console.log(form);

    loginFetch(username, password)
    const formJson = Object.fromEntries(form.entries());
    console.log(formJson);
    redirectUser();
  }

  async function loginFetch(username, password) {
    const response = await fetch('http://localhost:8080/user/login', {
      method: "POST",
      body: new URLSearchParams({
        'username': username,
        'password': password,
    }),
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
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