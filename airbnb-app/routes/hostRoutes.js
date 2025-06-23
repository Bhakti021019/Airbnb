import express from "express";
import { getHostAnalytics } from "../controllers/hostController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// GET /api/host/analytics
router.get('/analytics', authenticate, getHostAnalytics);

export default router;