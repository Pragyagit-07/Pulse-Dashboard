import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function StatusPieChart({ statusCounts }) {
  const COLORS = ["#4F46E5", "#F59E0B", "#10B981", "#EF4444"]; 
  const data = [
    { name: "Working", value: statusCounts.Working || 0 },
    { name: "Break", value: statusCounts.Break || 0 },
    { name: "Meeting", value: statusCounts.Meeting || 0 },
    { name: "Offline", value: statusCounts.Offline || 0 },
  ];

  return (
    <PieChart width={650} height={250}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={50}
        outerRadius={80}
        paddingAngle={2}
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend verticalAlign="bottom" height={36} />
    </PieChart>
  );
}





