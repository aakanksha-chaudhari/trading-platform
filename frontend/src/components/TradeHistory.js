// src/components/TradeHistory.js
import React, { useEffect, useState } from "react";
import API from "../api/api";

const TradeHistory = ({ refresh }) => {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    API.get("/trade/history")
      .then((res) => setTrades(res.data))
      .catch((err) => console.error(err));
  }, [refresh]);

  return (
    <table>
      <thead>
        <tr>
          <th>Asset</th>
          <th>Type</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {trades.map((t) => (
          <tr key={t.id}>
            <td>{t.asset}</td>
            <td>{t.trade_type}</td>
            <td>{t.quantity}</td>
            <td>{t.price}</td>
            <td>{t.total}</td>
            <td>{new Date(t.created_at).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TradeHistory;
