// src/components/TradeForm.js
import React, { useState } from "react";
import API from "../api/api";

const TradeForm = ({ type, symbol, onTrade }) => {
  const [quantity, setQuantity] = useState("");

  const handleTrade = async () => {
    if (!quantity || quantity <= 0) return alert("Enter valid quantity");

    try {
      const res = await API.post(`/trade/${type}`, { symbol, quantity: Number(quantity) });
      alert(res.data.message);
      setQuantity("");
      if (onTrade) onTrade(); // trigger refresh in parent
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Server Error");
    }
  };

  return (
    <div className="trade-form">
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button onClick={handleTrade}>{type.toUpperCase()}</button>
    </div>
  );
};

export default TradeForm;
