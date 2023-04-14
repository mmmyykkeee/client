import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SignIn from "./SignIn";
import SignUp from "./SignUp";

import axios from 'axios';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/api/currentUser', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setCurrentUser(res.data.username))
        .catch(err => console.log(err));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light container">
        <div className='d-flex col-6'>
          <Link className="navbar-brand" to="/">My App</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
          <div className="collapse navbar-collapse col-2" id="navbarNav">
            <ul className="navbar-nav">
              {!currentUser && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Sign-Up">Sign Up</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Sign-In">Sign In</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        <div className='col-2'>
          {currentUser && (
            <div className="mx-2 d-flex align-items-center justify-content-around">
              <p className="d-flex align-items-center mt-3">Welcome, {currentUser}!</p>
              <button className="btn btn-outline-primary" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/Sign-Up" element={<SignUp />} />
        <Route path="/Sign-In" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;

