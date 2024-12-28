import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState([]);

  let navigate = useNavigate();

  function redirectUser() {
    navigate('/', {replace: true})
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
    // redirectUser();
  }

  function signUpFetch(username, email, password, confirmPassword) {
    fetch('http://localhost:8080/user/sign-up', {
      method: "POST",
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log(response);
      if (response.status === 400) {
        // setError(response.errors)
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.errors);
      setError(data.errors)
      // setError(data);
      // localStorage.setItem("JWT", data.token)
    })
    // .catch((error) => setError(error))
  }

  return (
    <>
      <h1>SiGN UP PAGE</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input 
          type="text" 
          name="username" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          required
        />
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          name="email"
          value={email} 
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          name="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input 
          type="password" 
          name="confirmPassword" 
          value={confirmPassword} 
          onChange={e => setConfirmPassword(e.target.value)} 
          required
        />
        <button type="submit">Sign Up</button>
        {
          error && error.map((err, index) => {
            return (
              <>
                <li key={index}>{err.msg}</li>
              </>
            )
          })
        }
      </form>
    </>
  );
}