import Listing from '../models/Listing.js';
import User from '../models/User.js';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

// Create listing (host only)
export const createListing = async (req, res) => {
  try {
    let images = [];
    // Add uploaded files (local)
    if (req.files) {
      images = req.files.map(file => `/uploads/${file.filename}`);
    }
    // Add image links from req.body.imageLinks (if provided)
    if (req.body.imageLinks) {
      const links = Array.isArray(req.body.imageLinks)
        ? req.body.imageLinks
        : [req.body.imageLinks];
      images.push(...links);
    }
    const {
      title, description, propertyType, location, price, amenities, availabilityStart, availabilityEnd
    } = req.body;
    const listing = await Listing.create({
      title, description, propertyType, location,
      price, amenities: amenities ? amenities.split(',').map(a => a.trim()) : [],
      images,
      availability: { start: availabilityStart, end: availabilityEnd },
      host: req.user.id
    });
    res.status(201).json(listing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all listings (anyone)
export const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find().populate('host', 'username');
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching listings", error: err });
  }
};

// Get single listing (detailed)
export const getListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate('host', 'username');
    if (!listing) return res.status(404).json({ message: 'Not found' });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: "Error fetching listing", error: err });
  }
};

// Alias for getListing (for flexibility)
export const getListingById = getListing;

// Update listing (host only, owner)
export const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Not found' });
    if (listing.host.toString() !== req.user.id) return res.status(403).json({ message: 'Not allowed' });

    if (req.files) {
      listing.images.push(...req.files.map(file => `/uploads/${file.filename}`));
    }
    if (req.body.imageLinks) {
      const links = Array.isArray(req.body.imageLinks) ? req.body.imageLinks : [req.body.imageLinks];
      listing.images.push(...links);
    }

    [
      'title', 'description', 'propertyType', 'location', 'price'
    ].forEach(field => {
      if (req.body[field]) listing[field] = req.body[field];
    });

    if (req.body.amenities) {
      listing.amenities = req.body.amenities.split(',').map(a => a.trim());
    }
    if (req.body.availabilityStart && req.body.availabilityEnd) {
      listing.availability = {
        start: req.body.availabilityStart,
        end: req.body.availabilityEnd
      };
    }
    await listing.save();
    res.json(listing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete listing (host only, owner)
export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Not found' });
    if (listing.host.toString() !== req.user.id) return res.status(403).json({ message: 'Not allowed' });
    await listing.deleteOne();
    res.json({ message: 'Listing deleted' });
  } catch (err) {
    res.status(500).json({ message: "Error deleting listing", error: err });
  }
};