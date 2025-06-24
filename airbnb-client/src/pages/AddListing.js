import React, { useState } from 'react';
import ListingForm from '../components/ListingForm';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

function AddListing() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (listingData) => {
    try {
      const formData = new FormData();
      formData.append('title', listingData.title);
      formData.append('description', listingData.description);
      formData.append('propertyType', listingData.propertyType);
      formData.append('location', listingData.location);
      formData.append('price', listingData.price);
      formData.append('availability', JSON.stringify(listingData.availability));

      // amenities is an array
      listingData.amenities.forEach((a, i) => formData.append(`amenities[${i}]`, a));

      // Image links (array of URLs as strings)
      if (listingData.imageLinks && listingData.imageLinks.length > 0) {
        listingData.imageLinks.forEach((link, i) => formData.append(`imageLinks[${i}]`, link));
      }

      // Local image files
      if (listingData.images && listingData.images.length > 0) {
        // FileList is not an array, use Array.from
        Array.from(listingData.images).forEach((file) =>
          formData.append('images', file)
        );
      }

      await api.post('/listings/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add listing');
    }
  };

  return (
    <div className="container" style={{ maxWidth: 600 }}>
      <h2>Add New Listing</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <ListingForm onSubmit={handleSubmit} />
    </div>
  );
}

export default AddListing;