import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ListingDetail from './pages/ListingDetail';
import HostDashboard from './pages/HostDashboard';
import EditListing from './pages/EditListing';
import AddListing from './pages/AddListing';
import UpdateProfile from './pages/UpdateProfile';
import Profile from './pages/Profile';
import AnalyticsDashboard from './pages/AnalyticsDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState(""); // Search state for the search bar in Navbar

  useEffect(() => {
    // Optionally decode token to set user on refresh
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ username: payload.username, role: payload.role });
      } catch {}
    }
  }, []);

  return (
    <>
      <Navbar user={user} setUser={setUser} search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home user={user} search={search} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/listing/:id" element={<ListingDetail user={user} />} />
        <Route path="/host" element={user?.role === 'host' ? <HostDashboard user={user} /> : <div className="container">Access Denied</div>} />
        <Route path="/listing/:id/edit" element={user?.role === 'host' ? <EditListing user={user} /> : <div className="container">Access Denied</div>} />
        <Route path="/profile" element={user ? <Profile user={user} /> : <div className="container">Access Denied</div>} />
        <Route path="/dashboard" element={user ? <AnalyticsDashboard user={user} /> : <div className="container">Access Denied</div>} />
        <Route path="/add-listing" element={<AddListing />} />
        <Route path="/profile/update" element={<UpdateProfile />} />
      </Routes>
    </>
  );
}

export default App;