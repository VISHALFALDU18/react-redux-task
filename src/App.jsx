import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import './App.css'

function App() {


  return (
    <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
      <Router>
        <nav style={{ padding: '10px', color: '#646cff' }}>
          <Link to="/">Login</Link> | <Link to="/register">Register</Link> | {" "}
          <Link to="/products">Products</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
