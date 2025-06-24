// import React, { useEffect, useState } from 'react';
// import api from '../api/axios';
// import ListingForm from '../components/ListingForm';

// function HostDashboard({ user }) {
//   const [listings, setListings] = useState([]);
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     if (user) {
//       api.get('/listings').then(res =>
//         setListings(res.data.filter(l => l.host?.username === user.username))
//       );
//     }
//   }, [user]);

//   const handleCreate = async formData => {
//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (key === 'images') {
//         Array.from(value).forEach(file => data.append('images', file));
//       } else if (key === 'imageLinks') {
//         value.forEach(link => data.append('imageLinks', link));
//       } else {
//         data.append(key, value);
//       }
//     });
//     const token = localStorage.getItem('token');
//     await api.post('/listings', data, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     setShowForm(false);
//     // refresh listings
//     api.get('/listings').then(res =>
//       setListings(res.data.filter(l => l.host?.username === user.username))
//     );
//   };

//   return (
//     <div className="container">
//       <h2>Host Dashboard</h2>
//       <button className="btn btn-success mb-3" onClick={() => setShowForm(!showForm)}>
//         {showForm ? 'Hide' : 'Add New Listing'}
//       </button>
//       {showForm && <ListingForm onSubmit={handleCreate} />}
//       <div>
//         {listings.map(listing => (
//           <div key={listing._id} className="mb-3">
//             <strong>{listing.title}</strong> — {listing.location}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default HostDashboard;



import React, { useEffect, useState } from "react";
import api from "../api/axios";
import ListingForm from '../components/ListingForm';

function HostDashboard({ user }) {
  const [data, setData] = useState(null);
  const [listings, setListings] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch analytics data
  useEffect(() => {
    api.get("/host/analytics").then(res => setData(res.data));
  }, []);

  // Fetch host's listings
  useEffect(() => {
    if (user) {
      api.get('/listings').then(res =>
        setListings(res.data.filter(l => l.host?.username === user.username))
      );
    }
  }, [user]);

  // Add new listing
  const handleCreate = async formData => {
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
    await api.post('/listings', data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setShowForm(false);
    // refresh listings
    api.get('/listings').then(res =>
      setListings(res.data.filter(l => l.host?.username === user.username))
    );
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>Host Dashboard</h2>
      <div className="mb-4">
        <h4>Analytics</h4>
        <p>Total Listings: {data.totalListings}</p>
        <p>Total Bookings: {data.totalBookings}</p>
      </div>
      <button className="btn btn-success mb-3" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide' : 'Add New Listing'}
      </button>
      {showForm && <ListingForm onSubmit={handleCreate} />}
      <div>
        <h4>Your Listings</h4>
        {listings.length === 0 && <div>No listings yet.</div>}
        {listings.map(listing => (
          <div key={listing._id} className="mb-3">
            <strong>{listing.title}</strong> — {listing.location}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HostDashboard;








