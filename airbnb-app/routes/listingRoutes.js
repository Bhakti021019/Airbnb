import express from 'express';
import multer from 'multer';
import { authenticate } from '../middleware/auth.js';
import { authorizeRole } from '../middleware/role.js';
import {
  createListing,
  getAllListings,
  getListing,
  updateListing,
  deleteListing,
  getListingById
} from '../controllers/listingController.js';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

// Public routes
router.get('/', getAllListings); // Anyone can get all listings

// Get single listing (by id)
router.get('/:id', getListing); // Anyone can get a single listing
// If you want to support both getListing and getListingById for flexibility/aliasing:
// router.get('/:id', getListingById); // But usually one is enough

// Host routes (protected)
router.post(
  '/',
  authenticate,
  authorizeRole('host'),
  upload.array('images', 10),
  createListing
);

router.put(
  '/:id',
  authenticate,
  authorizeRole('host'),
  upload.array('images', 10),
  updateListing
);

router.delete(
  '/:id',
  authenticate,
  authorizeRole('host'),
  deleteListing
);

export default router;