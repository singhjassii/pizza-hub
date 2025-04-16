"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function BarGraph({ top10ItemsRevenue }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={top10ItemsRevenue}
        margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
      >
        <CartesianGrid />
        <XAxis
          dataKey="name"
          tick={({ x, y, payload }) => {
            const words = payload.value.split(" ");
            return (
              <g transform={`translate(${x},${y})`}>
                {words.map((word, index) => (
                  <text
                    key={index}
                    x={0}
                    y={index * 16}
                    textAnchor="middle"
                    dominantBaseline="hanging"
                    fontSize={12}
                  >
                    {word}
                  </text>
                ))}
              </g>
            );
          }}
          interval={0}
        />
        <YAxis dataKey="revenue" />
        <Tooltip />
        {/* <Legend /> */}
        <Bar
          dataKey="revenue"
          fill="#C82734"
          background={{
            fill: "var(--page-bg-color)",
            radius: [20, 20, 20, 20],
          }}
          barSize="2%"
          radius={[20, 20, 20, 20]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
export default BarGraph;
