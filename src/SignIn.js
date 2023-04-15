import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        setError('');
        setSuccessMessage('Sign in successful ... Redirecting');
        setTimeout(() => {
          navigate('/App/');
        }, 3000);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError('Something went wrong');
    }

    setLoading(false);
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
       
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        {successMessage && <p className="text-success">{successMessage}</p>}
        {error && <p className='text-danger'>{error}</p>}
      </form>
    </div>
  );
}

export default SignIn;
