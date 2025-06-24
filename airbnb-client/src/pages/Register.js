import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'client' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const validatePassword = (password) => (
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password)
  );

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateEmail(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(form.password)) {
      setError('Password must be at least 8 characters and include a number, an uppercase, and a lowercase letter.');
      return;
    }

    try {
      await api.post('/auth/register', form); // <-- updated endpoint!
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container" style={{ maxWidth: 400 }}>
      <h2>Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <input className="form-control mb-2" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input className="form-control mb-2" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <select className="form-control mb-2" name="role" value={form.role} onChange={handleChange}>
          <option value="client">Client</option>
          <option value="host">Host</option>
        </select>
        <button className="btn btn-primary w-100" type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;