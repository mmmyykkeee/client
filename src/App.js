// import React, { useState } from "react";
// import { Routes, Route, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import SignIn from "./SignIn";
// import SignUp from "./SignUp";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [currentUser, setCurrentUser] = useState("");

//   const handleLogIn = (username) => {
//     setIsLoggedIn(true);
//     setCurrentUser(username);
//   };

//   const handleLogOut = () => {
//     setIsLoggedIn(false);
//     setCurrentUser("");
//   };

//   return (
//     <div className="container">
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//         <a className="navbar-brand" href="/">
//           Your App Name
//         </a>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-toggle="collapse"
//           data-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav mr-auto">
//             <li className="nav-item">
//               <Link to="/" className="nav-link">
//                 Home
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/about" className="nav-link">
//                 About
//               </Link>
//             </li>
//           </ul>
//           <ul className="navbar-nav">
//             {!isLoggedIn && (
//               <>
//                 <li className="nav-item">
//                   <Link to="/Sign-In" className="nav-link">
//                     Sign In
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/Sign-Up" className="nav-link">
//                     Sign Up
//                   </Link>
//                 </li>
//               </>
//             )}
//             {isLoggedIn && (
//               <>
//                 <li className="nav-item">
//                   <span className="nav-link">Welcome {currentUser}</span>
//                 </li>
//                 <li className="nav-item">
//                   <button className="btn btn-link nav-link" onClick={handleLogOut}>
//                     Log Out
//                   </button>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </nav>
      // <Routes>
      //   <Route path="/Sign-Up" element={<SignUp />} />
      //   <Route path="/Sign-In" element={<SignIn onLogIn={handleLogIn} />} />
      // </Routes>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router,  Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import SignUp from './SignUp';
import SignIn from './SignIn';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/api/currentUser', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setLoggedInUser(response.data.username))
        .catch(error => console.log(error));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedInUser(null);
  };

  return (
   
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
        <Routes>
        <Route path="/Sign-Up" element={<SignUp />} />
        <Route path="/Sign-In" element={<SignIn />} />
            </Routes>
      </div>
    
  );
};

export default App;
