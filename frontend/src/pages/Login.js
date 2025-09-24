import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  // Prefill login with signup data
  useEffect(() => {
    const savedUser = localStorage.getItem("signupUser");
    if (savedUser) {
      const { email, password } = JSON.parse(savedUser);
      setForm({ email, password });
    }
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Admin shortcut
    if (form.email === "admin@123.com" && form.password === "admin773") {
      alert("Admin login successful!");
      navigate("/admin");
    } else {
      alert("Login successful!");
      navigate("/dashboard");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {/* Admin credentials info */}
      <p style={{ color: "blue", marginBottom: "10px" }}>
        Note: admin - admin@123.com | pwd - admin773
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
