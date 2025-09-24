// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load env variables first
dotenv.config();

// DB
const db = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const tradeRoutes = require("./routes/tradeRoutes");
const adminRoutes = require("./routes/adminRoutes"); // no verification middleware
//const userRoutes = require("./routes/userRoutes"); // profile & demo balance routes

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// === Routes ===
// Auth routes
app.use("/api/auth", authRoutes);

// Trade routes
app.use("/api/trade", tradeRoutes);

// Admin routes (⚡ no verification)
app.use("/api/admin", adminRoutes);

// User routes (Profile, demo balance)
// app.use("/api/user", userRoutes);

// Market Data (dummy)
app.get("/api/market/:symbol", (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const data = [
    { price: 150, time: "10:00" },
    { price: 152, time: "10:05" },
    { price: 151, time: "10:10" },
    { price: 153, time: "10:15" },
    { price: 155, time: "10:20" },
  ];
  res.json(data);
});

// Helper: log DB errors
function handleDBError(err, res, context) {
  console.error("DB ERROR in", context, ":", err);
  return res.status(500).json({ message: "Server error: " + context });
}

// Trade Buy API
app.post("/api/trade/buy", (req, res) => {
  const { symbol, quantity } = req.body;
  if (!symbol || !quantity || quantity <= 0)
    return res.status(400).json({ message: "Invalid symbol or quantity" });

  const userId = 1; // temp user
  const price = 150;
  const total = price * quantity;

  db.query("SELECT walletBalance FROM users WHERE id = ?", [userId], (err, results) => {
    if (err) return handleDBError(err, res, "fetching wallet");
    if (!results[0]) return res.status(400).json({ message: "User not found" });

    const wallet = results[0].walletBalance;
    if (wallet < total) return res.status(400).json({ message: "Insufficient balance" });

    db.query("UPDATE users SET walletBalance = walletBalance - ? WHERE id = ?", [total, userId], (err) => {
      if (err) return handleDBError(err, res, "updating wallet");

      db.query(
        "INSERT INTO trades (user_id, asset, trade_type, quantity, price, total) VALUES (?, ?, 'buy', ?, ?, ?)",
        [userId, symbol, quantity, price, total],
        (err) => {
          if (err) return handleDBError(err, res, "inserting trade");
          res.json({ message: `Bought ${quantity} ${symbol}` });
        }
      );
    });
  });
});

// Trade Sell API
app.post("/api/trade/sell", (req, res) => {
  const { symbol, quantity } = req.body;
  if (!symbol || !quantity || quantity <= 0)
    return res.status(400).json({ message: "Invalid symbol or quantity" });

  const userId = 1; // temp user
  const price = 155;
  const total = price * quantity;

  db.query("UPDATE users SET walletBalance = walletBalance + ? WHERE id = ?", [total, userId], (err) => {
    if (err) return handleDBError(err, res, "updating wallet");

    db.query(
      "INSERT INTO trades (user_id, asset, trade_type, quantity, price, total) VALUES (?, ?, 'sell', ?, ?, ?)",
      [userId, symbol, quantity, price, total],
      (err) => {
        if (err) return handleDBError(err, res, "inserting trade");
        res.json({ message: `Sold ${quantity} ${symbol}` });
      }
    );
  });
});

// Test Ping
app.get("/ping", (req, res) => res.send("pong"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
