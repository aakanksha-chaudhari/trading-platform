import Trade from "../models/Trade.js";

export const getPortfolioAnalytics = async (req, res) => {
  try {
    const userId = req.user.id; // assuming JWT middleware sets req.user
    const trades = await Trade.find({ userId });

    if (trades.length === 0) {
      return res.json({
        totalTrades: 0,
        wins: 0,
        losses: 0,
        avgProfit: 0,
        totalProfit: 0,
      });
    }

    let totalProfit = 0;
    let wins = 0;
    let losses = 0;

    trades.forEach((trade) => {
      // Profit calculation: (Sell - Buy) × qty
      let profit = 0;
      if (trade.type === "sell") {
        // Find matching buy trade before this sell
        const buyTrade = trades
          .filter(
            (t) =>
              t.asset === trade.asset &&
              t.type === "buy" &&
              new Date(t.date) < new Date(trade.date)
          )
          .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

        if (buyTrade) {
          profit = (trade.price - buyTrade.price) * trade.qty;
          totalProfit += profit;
          if (profit > 0) wins++;
          else losses++;
        }
      }
    });

    const totalTrades = trades.length;
    const avgProfit = totalTrades > 0 ? totalProfit / totalTrades : 0;

    res.json({
      totalTrades,
      wins,
      losses,
      avgProfit,
      totalProfit,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
