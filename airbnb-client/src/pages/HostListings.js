import React, { useEffect, useState } from "react";
import api from "../api/axios";
import ListingForm from "../components/ListingForm";

function HostListings() {
  const [listings, setListings] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    api.get("/host/listings")
      .then(res => setListings(res.data))
      .catch(() => setListings([]));
  }, []);

  const handleDelete = (id) => {
    api.delete(`/host/listings/${id}`).then(() => {
      setListings(listings.filter(l => l._id !== id));
    });
  };

  return (
    <div>
      <h2>Your Listings</h2>
      <ListingForm onSaved={l => setListings([...listings, l])} />
      <ul>
        {listings.map(l => (
          <li key={l._id}>
            {l.title} <button onClick={() => setEditing(l)}>Edit</button>
            <button onClick={() => handleDelete(l._id)}>Delete</button>
          </li>
        ))}
      </ul>
      {editing && (
        <ListingForm editing={editing} onSaved={updated => {
          setListings(listings.map(l => l._id === updated._id ? updated : l));
          setEditing(null);
        }} />
      )}
    </div>
  );
}

export default HostListings;