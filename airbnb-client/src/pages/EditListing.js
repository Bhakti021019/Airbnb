import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import ListingForm from '../components/ListingForm';

function EditListing({ user }) {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/listings/${id}`).then(res => setListing(res.data));
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'images') {
          Array.from(value).forEach(file => data.append('images', file));
        } else if (key === 'imageLinks') {
          value.forEach(link => data.append('imageLinks', link));
        } else {
          data.append(key, value);
        }
      });
      const token = localStorage.getItem('token');
      await api.put(`/listings/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate(`/listing/${id}`);
    } catch (err) {
      setError('Update failed');
    }
  };

  if (!listing) return <div className="container">Loading...</div>;

  // Only the owner host can edit
  if (listing.host?.username !== user.username) {
    return <div className="container">Access Denied</div>;
  }

  return (
    <div className="container">
      <h2>Edit Listing</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <ListingForm initialData={listing} onSubmit={handleUpdate} />
    </div>
  );
}

export default EditListing;