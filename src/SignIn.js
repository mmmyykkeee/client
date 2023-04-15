import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await fetch('/api/currentUser', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setCurrentUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentUser();
  }, []);

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
    setCurrentUser(null);
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
      {currentUser ? (
        <div>
          <p>Welcome, {currentUser.username}!</p>
          <button className='btn' onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
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
            <div className='password-input'>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {showPassword ? (
                <FaEyeSlash onClick={() => setShowPassword(false)} />
              ) : (
                <FaEye onClick={() => setShowPassword(true)} />
              )}
            </div>
            <br />
            <button type="submit">Sign In</button>
          </form>
          {message && (
            <p style={{ color: message.includes('successful') ? 'green' : 'red' }}>
              {message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default SignIn;