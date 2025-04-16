"use client";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function LineGraph({ last7daysOrders }) {
  return (
    <ResponsiveContainer width="90%" height="100%">
      <LineChart data={last7daysOrders}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis dataKey="order" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="order"
          stroke="#f7a11c"
          activeDot={{ r: 8 }}
        />
        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineGraph;
