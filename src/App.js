import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

import Home from './components/Home';
import Register from './components/Register';
import FAQ from './components/FAQ'
import Dashboard from './components/Dashboard';
import EditAccount from './components/EditAccount';
import Login from './components/Login';
import ForgetPassword from './components/ForgetPassword';

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
          <Route path="accounts/:username/edit" element={<EditAccount />}/>
          <Route path="/login/forget-password" element={<ForgetPassword/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
