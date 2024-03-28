import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Register';
import FAQ from './pages/FAQ'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ForgetPassword from './pages/ForgetPassword';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/FAQ" element={<FAQ />}/>
          <Route path="accounts/:username" element={<Dashboard />}/>
          <Route path="/login/forget-password" element={<ForgetPassword/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
