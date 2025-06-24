import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

function ListingDetail({ user }) {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [carouselIdx, setCarouselIdx] = useState(0);
  const navigate = useNavigate();

  // Sidebar user state
  const [sidebarUser, setSidebarUser] = useState({
    username: 'Guest',
    role: ''
  });

  // Sync user info from props or localStorage
  useEffect(() => {
    let username = user?.username || localStorage.getItem('username') || 'Guest';
    let role = user?.role || localStorage.getItem('role') || '';
    setSidebarUser({
      username,
      role: role.toLowerCase()
    });
  }, [user]);

  useEffect(() => {
    api.get(`/listings/${id}`).then(res => setListing(res.data));
  }, [id]);

  // Carousel logic
  const images = listing?.images || [];
  const hasImages = images.length > 0;

  const getImageSrc = (img) => {
    if (!img) return "";
    const isLocal = img.startsWith('/uploads') || (!img.startsWith('http') && !img.startsWith('data:'));
    return isLocal ? `http://localhost:5000${img.startsWith('/') ? img : `/${img}`}` : img;
  };

  const handlePrev = () => setCarouselIdx((carouselIdx - 1 + images.length) % images.length);
  const handleNext = () => setCarouselIdx((carouselIdx + 1) % images.length);
  const handleDot = (idx) => setCarouselIdx(idx);

  useEffect(() => {
    if (!hasImages) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line
  }, [carouselIdx, images.length, hasImages]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/listings/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/host');
    } catch (err) {
      setError('Failed to delete listing.');
    }
  };

  const handleBook = async () => {
    if (!user) {
      setError('Please log in to book this listing.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await api.post(`/bookings`, { listingId: id }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Booking successful!');
      setError('');
    } catch (err) {
      setError('Booking failed. Please try again.');
      setSuccess('');
    }
  };

  if (!listing) return <div className="container">Loading...</div>;

  const canEditOrDelete =
    user &&
    user.role === 'host' &&
    listing.host &&
    listing.host.username === user.username;

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
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
          marginTop: 0,
          position: 'fixed',
          top: 0,
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
        {sidebarUser.role === 'host' && (
          <button
            className="btn btn-success mt-4"
            style={{ width: '100%' }}
            onClick={() => navigate('/property/new')}
          >
            Add Property
          </button>
        )}
      </aside>
      {/* Main Content */}
      <main
        className="container"
        style={{
          flex: 1,
          padding: '32px 40px',
          marginLeft: 220,
          maxWidth: '100vw'
        }}
      >
        <h2>{listing.title}</h2>
        <div style={{ maxWidth: 400, marginBottom: 24, position: 'relative', minHeight: 150 }}>
          {hasImages && (
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <img
                src={getImageSrc(images[carouselIdx])}
                alt={`Listing ${carouselIdx + 1}`}
                style={{ width: 400, height: 250, objectFit: 'cover', borderRadius: 8 }}
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: 10,
                      transform: 'translateY(-50%)',
                      background: 'rgba(0,0,0,0.5)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50%',
                      width: 32,
                      height: 32,
                      cursor: 'pointer'
                    }}
                    aria-label="Previous Image"
                  >
                    ‹
                  </button>
                  <button
                    onClick={handleNext}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: 10,
                      transform: 'translateY(-50%)',
                      background: 'rgba(0,0,0,0.5)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50%',
                      width: 32,
                      height: 32,
                      cursor: 'pointer'
                    }}
                    aria-label="Next Image"
                  >
                    ›
                  </button>
                </>
              )}
              <div style={{ position: 'absolute', bottom: 8, left: 0, right: 0, textAlign: 'center' }}>
                {images.map((_, idx) => (
                  <span
                    key={idx}
                    onClick={() => handleDot(idx)}
                    style={{
                      display: 'inline-block',
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: idx === carouselIdx ? '#333' : '#ccc',
                      margin: '0 4px',
                      cursor: 'pointer',
                      border: idx === carouselIdx ? '2px solid #333' : '1px solid #ccc'
                    }}
                    aria-label={`Go to image ${idx + 1}`}
                    tabIndex={0}
                    onKeyDown={e => { if (e.key === 'Enter') handleDot(idx); }}
                  />
                ))}
              </div>
            </div>
          )}
          {!hasImages && (
            <div style={{
              width: 400,
              height: 250,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f0f0f0',
              borderRadius: 8,
              color: '#999'
            }}>
              No Image Available
            </div>
          )}
        </div>
        <p><strong>Description:</strong> {listing.description}</p>
        <p><strong>Property Type:</strong> {listing.propertyType}</p>
        <p><strong>Location:</strong> {listing.location}</p>
        <p><strong>Price:</strong> ${listing.price}</p>
        <p><strong>Amenities:</strong> {listing.amenities?.join(', ')}</p>
        <p><strong>Available:</strong> {listing.availability?.start?.slice(0,10)} to {listing.availability?.end?.slice(0,10)}</p>
        <p><strong>Host:</strong> {listing.host?.username}</p>

        <div className="mt-4">
          {canEditOrDelete ? (
            <>
              <Link to={`/listing/${listing._id}/edit`} className="btn btn-warning me-2">Edit</Link>
              <button onClick={handleDelete} className="btn btn-danger">Delete</button>
            </>
          ) : (
            <button onClick={handleBook} className="btn btn-primary">Book</button>
          )}
        </div>
        {success && <div className="alert alert-success mt-3">{success}</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </main>
    </div>
  );
}

export default ListingDetail;