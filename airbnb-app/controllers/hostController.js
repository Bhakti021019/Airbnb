import Listing from "../models/Listing.js";
import Booking from "../models/Booking.js";

export const getHostAnalytics = async (req, res) => {
  try {
    const hostId = req.user.id;
    const listings = await Listing.find({ host: hostId });
    const listingIds = listings.map(l => l._id);
    const bookings = await Booking.find({ listing: { $in: listingIds } });
    res.json({
      totalListings: listings.length,
      totalBookings: bookings.length
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching analytics", error: err });
  }
};