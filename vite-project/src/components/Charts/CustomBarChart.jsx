import React from "react";
import {
  Bar,
  BarChart,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CustomBarChart = ({ data, xAxisKey = "category" }) => {
  // function to atlernate colors
  const getBarColor = (index) => {
    return index % 2 === 0 ? "#875cf5" : "#cfbefb";
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;

      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300 max-w-xs">
          <p className="text-xs font-semibold text-purple-800 mb-1">
            {data.date || data.category}
          </p>

          <p className="text-sm font-medium text-gray-900 mb-2">
            Total: ${data.amount}
          </p>

          {data.details?.length > 0 && (
            <ul className="text-xs text-gray-600 space-y-1">
              {data.details.map((inc, i) => (
                <li key={i}>
                  {inc.source}:{" "}
                  <span className="font-medium">${inc.amount}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />

          <XAxis
            dataKey={xAxisKey}
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />

          <Tooltip content={<CustomTooltip />} />

          <Bar
            dataKey="amount"
            fill="#FF8042"
            radius={[10, 10, 0, 0]}
            // activeDot={{ r: 8, fill: "yellow" }}
            // activeStyle={{ fill: "green" }}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
