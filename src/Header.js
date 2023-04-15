import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

function Header() {
    const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/api/currentUser', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setLoggedInUser(response.data.username))
        .catch(error => console.log(error));
        console.log(setLoggedInUser)
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedInUser(null);
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light container">
          <Link className="navbar-brand" to="/">My App</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              {loggedInUser ? (
                <>
                  <li className="nav-item">
                    <p className="nav-link">Welcome, {loggedInUser}!</p>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-danger" onClick={handleLogout}>Log out</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Sign-Up">Sign up</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Sign-In">Sign in</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
    </div>
  )
}

export default Header
