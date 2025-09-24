// backend/controllers/tradeController.js
const db = require("../config/db");

// Trade History
exports.getTradeHistory = (req, res) => {
  const userId = req.user?.id || 1; // fallback to 1 for testing

  db.query(
    "SELECT id, asset, trade_type, quantity, price, total, created_at FROM trades WHERE user_id = ? ORDER BY created_at DESC",
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Server error" });
      res.json(results);
    }
  );
};

// Portfolio Analytics
exports.getPortfolioAnalytics = (req, res) => {
  const userId = req.user?.id || 1;

  db.query("SELECT * FROM trades WHERE user_id = ?", [userId], (err, trades) => {
    if (err) return res.status(500).json({ message: "Server error" });

    const totalTrades = trades.length;

    let totalProfit = 0;
    let wins = 0;
    let losses = 0;

    trades.forEach((t) => {
      const tradeTotal = parseFloat(t.total); // convert string to number
      if (t.trade_type === "sell") {
        totalProfit += tradeTotal;
        wins++;
      } else if (t.trade_type === "buy") {
        totalProfit -= tradeTotal;
        losses++;
      }
    });

    const avgProfit = totalTrades ? totalProfit / totalTrades : 0;

    res.json({
      totalTrades,
      wins,
      losses,
      totalProfit: totalProfit.toFixed(2),
      avgProfit: avgProfit.toFixed(2),
    });
  });
};
