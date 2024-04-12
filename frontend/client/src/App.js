import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Register';
import FAQ from './pages/FAQ'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ForgetPassword from './pages/ForgetPassword';
import Explore from './pages/Explore';


function App() {

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null; // Return true if token exists, else false
};

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} />          
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/login/forget-password" element={<ForgetPassword />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
