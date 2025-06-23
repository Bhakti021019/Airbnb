import express from "express";
import { createBooking, getUserBookings } from "../controllers/bookingController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authenticate, createBooking);
router.get("/my", authenticate, getUserBookings);

export default router;