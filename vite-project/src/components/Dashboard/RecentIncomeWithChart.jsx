import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = [
  "#875CF5",
  "#FA2C37",
  "#FF6900",
  "#4f39f6",
  "#00C49F",
  "#FFBB28",
  "#0088FE",
  "#A569BD",
  "#F5B041",
];
const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const grouped = data.reduce((acc, item) => {
      const source = item.source || "Other";

      if (!acc[source]) {
        acc[source] = 0;
      }

      acc[source] += item.amount || 0;
      return acc;
    }, {});

    const chartDataArr = Object.entries(grouped).map(([name, amount]) => ({
      name,
      amount,
    }));

    setChartData(chartDataArr);
  };

  useEffect(() => {
    prepareChartData();
    return () => {};
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`₹${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;
