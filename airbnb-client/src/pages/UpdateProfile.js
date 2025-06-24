import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function UpdateProfile() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    role: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/auth/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setForm(res.data))
      .catch(() => setError("Failed to load profile"));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(
        "/auth/profile",
        {
          username: form.username,
          email: form.email,
          role: form.role,
          phone: form.phone,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      navigate("/profile");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update profile"
      );
    }
  };

  return (
    <div className="container" style={{ maxWidth: 500, marginTop: 40 }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4" style={{ fontWeight: 700 }}>
            Update Profile
          </h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                className="form-control"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                className="form-control"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <input
                className="form-control"
                name="role"
                value={form.role}
                onChange={handleChange}
                disabled
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;