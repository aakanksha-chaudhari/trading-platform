// src/pages/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // optional for extra styling

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header>
        <h1 className="site-title">💹 TradeMaster</h1>
        <p className="site-tagline">Learn, Trade, and Grow Your Virtual Portfolio!</p>
      </header>

      <div className="cards-container">
        <div className="card signup-card" onClick={() => navigate("/signup")}>
          <h2>Signup</h2>
          <p>Create your account and start trading with virtual money.</p>
        </div>

        <div className="card login-card" onClick={() => navigate("/login")}>
          <h2>Login</h2>
          <p>Already have an account? Access your dashboard now.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
