import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Header from './Header'

const App = () => {
  

  return (
    
      <div>
        <Header />
        <Routes>
          <Route path="/Sign-Up" element={<SignUp />} />
          <Route path="/Sign-In" element={<SignIn />} />
          <Route path="/App" element={<App />} />

        </Routes>
      </div>
    
  );
};

export default App;
