import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import ListingCard from '../components/ListingCard';

function Home({ user, search }) {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  // State for user info in sidebar
  const [sidebarUser, setSidebarUser] = useState({
    username: 'Guest',
    role: ''
  });

  useEffect(() => {
    let username = user?.username || localStorage.getItem('username') || 'Guest';
    let role = user?.role || localStorage.getItem('role') || '';
    setSidebarUser({
      username,
      role: role.toLowerCase()
    });
  }, [user]);

  useEffect(() => {
    api.get('/listings')
      .then(res => setListings(res.data))
      .catch(() => setListings([]));
  }, []);

  // Filter listings based on search prop
  const filteredListings = search
    ? listings.filter(
        l =>
          l.title?.toLowerCase().includes(search.toLowerCase()) ||
          l.description?.toLowerCase().includes(search.toLowerCase()) ||
          l.location?.toLowerCase().includes(search.toLowerCase()) ||
          l.propertyType?.toLowerCase().includes(search.toLowerCase())
      )
    : listings;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 220,
          background: '#f8f9fa',
          padding: '32px 16px 0 16px',
          borderRight: '1px solid #eee',
          minHeight: '100vh',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          position: 'fixed',
          top: 50,
          left: 0,
          zIndex: 10,
          height: '100vh'
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 24, marginTop: 0 }}>
          Hey {sidebarUser.username}!
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Link to="/profile" style={{ textDecoration: 'none', color: '#333', padding: '8px 0', fontWeight: 500 }}>Profile</Link>
          <Link to="/dashboard" style={{ textDecoration: 'none', color: '#333', padding: '8px 0', fontWeight: 500 }}>Analytics Dashboard</Link>
        </nav>
      </aside>
      {/* Main Content */}
      <main
        style={{
          flex: 1,
          padding: '32px 40px',
          marginLeft: 220, // Offset for the fixed sidebar
          maxWidth: '100vw'
        }}
      >
        <h2 className="mb-4" style={{ fontSize: 40, fontWeight: 700 }}>All Listings</h2>
        {filteredListings.length === 0 ? (
          <div>No listings found.</div>
        ) : (
          <div className="row" style={{ gap: '32px 0' }}>
            {filteredListings.map(listing => (
              <div key={listing._id} className="col-md-4 mb-4 d-flex align-items-stretch">
                <ListingCard listing={listing} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;