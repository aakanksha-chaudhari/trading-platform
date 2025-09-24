import React, { useEffect, useState } from "react";
import axios from "axios";

const TradeHistory = () => {
  const [trades, setTrades] = useState([]);
  const [analytics, setAnalytics] = useState({ totalTrades: 0, wins: 0, avgProfit: 0 });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("${import.meta.env.VITE_API_URL}/api/trades", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTrades(res.data);
      } catch (err) {
        console.error("❌ Trade API error:", err.message);
        setError("Trade history not available (API not connected).");
      }
    };

    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/portfolio`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAnalytics(res.data);
      } catch (err) {
        console.error("❌ Portfolio API error:", err.message);
        setError("Portfolio analytics not available (API not connected).");
      }
    };

    fetchTrades();
    fetchAnalytics();
  }, []);

  return (
    <div>
      <h2>Trade History</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Date</th>
            <th>Symbol</th>
            <th>Type</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Profit/Loss</th>
          </tr>
        </thead>
        <tbody>
          {trades.length > 0 ? (
            trades.map((t) => (
              <tr key={t.id}>
                <td>{new Date(t.created_at).toLocaleString()}</td>
                <td>{t.symbol}</td>
                <td>{t.type}</td>
                <td>{t.quantity}</td>
                <td>{t.price}</td>
                <td>{t.profitLoss}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No trade history available</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Analytics</h3>
      <p>Total Trades: {analytics.totalTrades}</p>
      <p>Wins: {analytics.wins}</p>
      <p>Average Profit: {analytics.avgProfit}</p>
    </div>
  );
};

export default TradeHistory;
