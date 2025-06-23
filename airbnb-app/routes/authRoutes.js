import express from "express";
import { register, login, getProfile } from "../controllers/authController.js";
import { updateProfile } from "../controllers/profileController.js";
import { getHostAnalytics } from "../controllers/hostController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Authentication routes
router.post('/register', register);
router.post('/login', login);

// Profile routes
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);

// Host analytics route
router.get('/host/analytics', authenticate, getHostAnalytics);

export default router;