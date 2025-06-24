import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, setUser, search, setSearch }) {
  const navigate = useNavigate();

  // Debug: log user to verify structure and role
  console.log('Navbar user:', user);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light mb-4"
      style={{ zIndex: 100, position: "sticky", top: 0, left: 0, width: "100%" }}
    >
      <div className="container-fluid d-flex align-items-center">
        <Link className="navbar-brand" to="/">Airbnb</Link>
        <div className="d-flex align-items-center flex-grow-1">
          <Link className="btn btn-outline-secondary me-2" to="/">Home</Link>
          {/* Host Dashboard between Home and Logout, only for hosts */}
          {user && user.role === 'host' && (
            <Link className="btn btn-primary me-2" to="/host">Host Dashboard</Link>
          )}
          {user ? (
            <button className="btn btn-outline-danger me-2" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link className="btn btn-outline-primary me-2" to="/login">Login</Link>
              <Link className="btn btn-primary me-2" to="/register">Register</Link>
            </>
          )}
        </div>
        {/* Search bar */}
        <form className="ms-auto" style={{ maxWidth: 400, flexGrow: 1 }}>
          <input
            className="form-control"
            type="search"
            placeholder="Search by title, description, location, or property type"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ minWidth: 220 }}
          />
        </form>
      </div>
    </nav>
  );
}

export default Navbar;