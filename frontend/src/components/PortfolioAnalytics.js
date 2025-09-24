// src/components/PortfolioAnalytics.js
import React, { useEffect, useState } from "react";
import API from "../api/api";

const PortfolioAnalytics = ({ refresh }) => {
  const [analytics, setAnalytics] = useState({
    totalTrades: 0,
    wins: 0,
    losses: 0,
    totalProfit: 0,
    avgProfit: 0,
  });

  useEffect(() => {
    API.get("/trade/portfolio")
      .then((res) => setAnalytics(res.data))
      .catch((err) => console.error(err));
  }, [refresh]);

  return (
    <div>
      <p>Total Trades: {analytics.totalTrades}</p>
      <p>Wins: {analytics.wins}</p>
      <p>Losses: {analytics.losses}</p>
      <p>Total Profit/Loss: {analytics.totalProfit}</p>
      <p>Avg Profit per Trade: {analytics.avgProfit}</p>
    </div>
  );
};

export default PortfolioAnalytics;
