import React, { useEffect, useState } from 'react';
import api from '../api/axios'; // Make sure this points to your axios setup

const AnalyticsDashboard = ({ user }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch stats for this host
    if (user) {
      api.get(`/host/analytics`) // Or `/host/analytics/${user.id}` if your API expects ID
        .then(res => {
          setStats(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user]);

  if (loading) return <div style={{ padding: 32 }}>Loading analytics...</div>;
  if (!stats) return <div style={{ padding: 32, color: 'red' }}>No analytics found for this host.</div>;

  return (
    <div className="analytics-dashboard" style={{padding: 32}}>
      <h2>Analytical Dashboard</h2>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 24,
        marginTop: 24
      }}>
        <StatCard label="Total Listings" value={stats.totalListings} />
        <StatCard label="Total Bookings" value={stats.totalBookings} />
        <StatCard label="Earnings ($)" value={stats.earnings} />
        <StatCard label="Page Views" value={stats.views} />
        <StatCard label="Favorites" value={stats.favoriteCount} />
      </div>
      {/* You can add chart visualizations here using chart libraries */}
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div style={{
    background: '#f5f5f5',
    borderRadius: 8,
    padding: 24,
    minWidth: 160,
    textAlign: 'center',
    boxShadow: '0 1px 3px #ddd'
  }}>
    <div style={{fontSize: 24, fontWeight: 'bold'}}>{value}</div>
    <div style={{fontSize: 16, color: '#555'}}>{label}</div>
  </div>
);

export default AnalyticsDashboard;