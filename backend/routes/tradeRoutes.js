// backend/routes/tradeRoutes.js
const express = require("express");
const {
  getTradeHistory,
  getPortfolioAnalytics,
} = require("../controllers/tradeController");

const router = express.Router();

// Temporary verifyToken (replace with real auth later)
const verifyToken = (req, res, next) => {
  req.user = { id: 1 }; // Mock user for testing
  next();
};

// Trade History
router.get("/history", verifyToken, getTradeHistory);

// Portfolio Analytics
router.get("/portfolio", verifyToken, getPortfolioAnalytics);

module.exports = router;
