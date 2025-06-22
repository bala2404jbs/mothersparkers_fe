import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { mockSpendData } from "@/lib/mock-data";

export function SpendChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={mockSpendData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
        <Tooltip formatter={(value: number) => [`$${(value / 1000).toFixed(0)}K`, "Spending"]} />
        <Bar dataKey="value" fill="#3B82F6" />
      </BarChart>
    </ResponsiveContainer>
  );
}
