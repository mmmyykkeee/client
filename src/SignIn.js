import React, { useState } from 'react';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      setMessage('Sign in successful');
      setTimeout(() => {
        setMessage('');
        window.location.href = "/";
      }, 1000);
    } else {
      setMessage('Sign in failed, Check your Username or Password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setMessage('Logged out');
    setTimeout(() => {
      setMessage('');
      window.location.href = "/";
    }, 3000);
  };

  const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token;
  }

  return (
    <div className='containers'>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Sign In</button>
      </form>
      {message && (
        <p style={{ color: message.includes('successful') ? 'green' : 'red' }}>
          {message}
        </p>
      )}
      {isLoggedIn() && (
        <button className='btn' onClick={handleLogout}></button>
      )}
    </div>
  );
}

export default SignIn;
