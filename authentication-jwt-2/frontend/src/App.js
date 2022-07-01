import './App.css';
import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import LupaPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import { Routes, Route } from 'react-router-dom';


function App() {
   return (
      <>
         <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/forgotpassword" element={<LupaPassword />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
         </Routes>
      </>
   );
}

export default App;
