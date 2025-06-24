import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Profile() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/auth/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setProfile(res.data))
      .catch(() => {
        setProfile({
          username: localStorage.getItem("username") || "",
          email: localStorage.getItem("email") || "",
          role: localStorage.getItem("role") || "",
          phone: localStorage.getItem("phone") || "",
        });
      });
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="container" style={{ maxWidth: 500, marginTop: 40 }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4" style={{ fontWeight: 700 }}>Profile</h2>
          <div className="mb-3">
            <strong>Username:</strong>
            <span className="ms-2">{profile.username || <i>Not set</i>}</span>
          </div>
          <div className="mb-3">
            <strong>Email:</strong>
            <span className="ms-2">{profile.email || <i>Not set</i>}</span>
          </div>
          <div className="mb-3">
            <strong>Phone:</strong>
            <span className="ms-2">{profile.phone || <i>Not set</i>}</span>
          </div>
          <div>
            <strong>Role:</strong>
            <span className="ms-2 text-capitalize">{profile.role || <i>Not set</i>}</span>
          </div>
          <button
            className="btn btn-primary mt-4"
            onClick={() => navigate("/profile/update")}
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;