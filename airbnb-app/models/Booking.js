import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true },
  date: { type: Date, required: true },
  guests: { type: Number, default: 1 }
});

export default mongoose.model("Booking", bookingSchema);