import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  propertyType: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  amenities: [String],
  images: [String], // URLs or local paths
  availability: {
    start: { type: Date, required: true },
    end: { type: Date, required: true }
  },
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model('Listing', listingSchema);