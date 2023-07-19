"use client";
import React, { useState } from "react";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "yashodaUser" && password === "password") {
      // Redirect to the home page after successful login.
      localStorage.setItem("verified", true);
      window.location.href = "/patient";
    } else {
      alert("Please enter the correct user details.");
    }
  };

  return (
    <div className="login-container min-h-screen flex items-center flex-col justify-center">
      <div className="text-4xl mb-16">
        Yashoda Hospitals Patient Management System
      </div>
      <div className="container">
        <h2 className="text-3xl">Login</h2>
        <div>
          <label className="label">Username:</label>
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="label">Password:</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
