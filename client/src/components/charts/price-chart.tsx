import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { mockPriceData } from "@/lib/mock-data";

export function PriceChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={mockPriceData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="coffee" 
          stroke="#8B4513" 
          strokeWidth={2}
          name="Coffee ($/lb)"
        />
        <Line 
          type="monotone" 
          dataKey="tea" 
          stroke="#10B981" 
          strokeWidth={2}
          name="Tea ($/kg)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
