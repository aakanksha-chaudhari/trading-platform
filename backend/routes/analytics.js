import express from "express";
import { getPortfolioAnalytics } from "../controllers/analyticsController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getPortfolioAnalytics);

export default router;
