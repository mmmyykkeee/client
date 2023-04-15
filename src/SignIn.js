import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const SignIn = ({ setLoggedInUser }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/signin', { username, password });
      localStorage.setItem('token', response.data.token);
      setLoggedInUser(username);
      setUsername('');
      setPassword('');
      setErrorMessage('');
      navigate.push('/');
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.response.data);
    }
  };

  return (
    <div className="container mt-3">
      <h2>Sign In</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
         <div style={{ position: "relative" }}>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
           <button
    type="button"
    className="btn btn-outline-none password-toggle-button"
    onClick={() => setShowPassword(!showPassword)}
    aria-label={showPassword ? "Hide password" : "Show password"}
    style={{
      position: "absolute",
      top: "50%",
      right: "10px",
      transform: "translateY(-50%)",
    }}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </button>
          </div>
        </Form.Group>

        {errorMessage && <div className="text-danger">{errorMessage}</div>}

        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </Form>
    </div>
  );
};

export default SignIn;
