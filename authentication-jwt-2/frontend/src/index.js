import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<BrowserRouter>
   <App />
</BrowserRouter>)

reportWebVitals();
