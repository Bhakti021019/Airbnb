import React from 'react';
import { Link } from 'react-router-dom';

const getImageUrl = img =>
  img
    ? img.startsWith('/uploads')
      ? `http://localhost:5000${img}`
      : img
    : 'https://via.placeholder.com/350x180?text=No+Image';

export default function ListingCard({ listing }) {
  const mainImg = getImageUrl(listing.images?.[0]);

  return (
    <div className="card mb-4 shadow-sm" style={{ maxWidth: 380, margin: "0 auto" }}>
      <img
        src={mainImg}
        alt={listing.title}
        className="card-img-top"
        style={{
          width: "100%",
          height: 180,
          objectFit: "cover",
          borderTopLeftRadius: "calc(.25rem - 1px)",
          borderTopRightRadius: "calc(.25rem - 1px)"
        }}
      />
      <div className="card-body">
        <h5 className="card-title">{listing.title}</h5>
        <p className="card-text">{listing.description?.slice(0, 60)}....</p>
        <p className="card-text mb-1">
          <strong>Location:</strong> {listing.location}
        </p>
        <p className="card-text mb-2">
          <strong>Price:</strong> ${listing.price}
        </p>
        <Link to={`/listing/${listing._id}`} className="btn btn-outline-primary btn-sm">
          View Details
        </Link>
      </div>
    </div>
  );
}