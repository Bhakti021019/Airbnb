import React, { useState } from "react";
import api from "../api/axios";

function BookingForm({ listingId }) {
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/bookings", { listingId, date, guests });
      alert("Booking successful!");
    } catch {
      alert("Booking failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <input type="number" min="1" value={guests} onChange={e => setGuests(e.target.value)} required />
      <button type="submit">Book Now</button>
    </form>
  );
}

export default BookingForm;