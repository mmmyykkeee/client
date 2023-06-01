import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <BrowserRouter>
    <App />
  </BrowserRouter>
  </React.StrictMode>
);

