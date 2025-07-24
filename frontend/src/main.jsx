import { StrictMode } from 'react';
import React from 'react';
import { createRoot } from 'react-dom/client';
// You don't need to import ReactDOM from 'react-dom/client' again here
// if you're directly using createRoot from 'react-dom/client'.
// So, you can remove: import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'; // <--- You need to import your App component!

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>    
       <App />
    </BrowserRouter>
  </React.StrictMode>
);