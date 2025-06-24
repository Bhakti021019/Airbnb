import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login({ setUser }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);

      // Store user data in localStorage for persistence
      localStorage.setItem("token", res.data.token);

      // Support both possible backend response shapes
      const userData = res.data.user || {
        username: res.data.username,
        role: res.data.role,
        email: res.data.email,
        name: res.data.name,
      };

      // Store in localStorage for other components (like sidebar/profile)
      if (userData.username) localStorage.setItem("username", userData.username);
      if (userData.role) localStorage.setItem("role", userData.role);
      if (userData.email) localStorage.setItem("email", userData.email);
      if (userData.name) localStorage.setItem("name", userData.name);

      // Optionally set to app state
      if (setUser) setUser(userData);

      // Redirect after login (updated to go to home page)
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="container" style={{ maxWidth: 400 }}>
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="btn btn-primary w-100" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;