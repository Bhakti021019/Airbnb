import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const { listingId, date, guests } = req.body;
    const userId = req.user.id;
    const booking = await Booking.create({
      user: userId,
      listing: listingId,
      date,
      guests
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Booking failed", error: err });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate("listing");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings", error: err });
  }
};