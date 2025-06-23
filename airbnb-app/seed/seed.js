require('dotenv').config();
const mongoose = require('mongoose');
const Listing = require('../models/Listing');
const User = require('../models/User');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // Clear collections
  await Listing.deleteMany();
  await User.deleteMany();

  // Create a host user
  const host = new User({
    name: 'Test Host',
    email: 'host@example.com',
    password: await require('bcryptjs').hash('password', 10),
    role: 'host'
  });
  await host.save();

  // Create a sample listing
  await Listing.create({
    title: 'Sunny Apartment',
    description: 'A beautiful sunny apartment in the city center.',
    propertyType: 'Apartment',
    location: 'New York',
    price: 120,
    amenities: ['WiFi', 'Kitchen'],
    images: ['https://example.com/image1.jpg'],
    availability: { start: new Date(), end: new Date(Date.now() + 7*24*60*60*1000) },
    host: host._id
  });

  console.log('Seed data created!');
  process.exit();
};

seed();