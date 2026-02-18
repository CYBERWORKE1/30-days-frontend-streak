import { useEffect, useState } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function CoinModal({ coin, onClose }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChart = async () => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=7`
      );
      const data = await res.json();
      const formatted = data.prices.map((item) => ({
        price: item[1],
      }));
      setChartData(formatted);
    };
    fetchChart();
  }, [coin]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal glass" onClick={(e) => e.stopPropagation()}>
        <h2>{coin.name} 7-Day Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <Line
              type="monotone"
              dataKey="price"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
