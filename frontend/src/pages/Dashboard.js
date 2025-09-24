// src/pages/Dashboard.js
import React, { useState, useEffect } from "react";
import MarketData from "../components/MarketData";
import TradeForm from "../components/TradeForm";
import TradeHistory from "../components/TradeHistory";
import PortfolioAnalytics from "../components/PortfolioAnalytics";
import "./Dashboard.css"; // optional styling

const Dashboard = () => {
  const [selectedAsset, setSelectedAsset] = useState("AAPL");
  const [refresh, setRefresh] = useState(false); // trigger refresh after trade

  // Refresh function to pass down to TradeForm
  const handleTrade = () => setRefresh(!refresh);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Trading Dashboard</h1>
        <select
          value={selectedAsset}
          onChange={(e) => setSelectedAsset(e.target.value)}
        >
          <option value="AAPL">AAPL</option>
          <option value="GOOGL">GOOGL</option>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
        </select>
      </header>

      <div className="dashboard-main">
        {/* Left Column */}
        <div className="dashboard-left">
          <div className="market-card">
            <h2>Market Data: {selectedAsset}</h2>
            <MarketData symbol={selectedAsset} refresh={refresh} />
          </div>
          <div className="trade-card">
            <h2>Trade {selectedAsset}</h2>
            <TradeForm type="buy" symbol={selectedAsset} onTrade={handleTrade} />
            <TradeForm type="sell" symbol={selectedAsset} onTrade={handleTrade} />
          </div>
        </div>

        {/* Right Column */}
        <div className="dashboard-right">
          <div className="history-card">
            <h2>Trade History</h2>
            <TradeHistory refresh={refresh} />
          </div>
          <div className="portfolio-card">
            <h2>Portfolio Analytics</h2>
            <PortfolioAnalytics refresh={refresh} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
