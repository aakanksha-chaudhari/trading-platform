// src/components/MarketData.js
import React, { useEffect, useState } from "react";
import API from "../api/api";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MarketData = ({ symbol, refresh }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get(`/market/${symbol}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [symbol, refresh]);

  const chartData = {
    labels: data.map((d) => d.time),
    datasets: [
      {
        label: symbol,
        data: data.map((d) => d.price),
        borderColor: "blue",
        fill: false,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default MarketData;
