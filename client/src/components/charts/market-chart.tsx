import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { realPriceData, aiPredictions } from "@/lib/mock-data";

export function MarketChart() {
  // Combine real data with AI predictions for seamless chart
  const combinedData = [
    ...realPriceData.slice(-15).map(item => ({ 
      date: item.date, 
      actual: item.price, 
      prediction: null,
      volume: item.volume,
      change: item.change
    })),
    ...aiPredictions.map(item => ({ 
      date: item.date, 
      actual: null, 
      prediction: item.price,
      confidence: item.confidence,
      volume: null,
      change: null
    }))
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={combinedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={['dataMin - 10', 'dataMax + 10']} />
        <Tooltip 
          formatter={(value: number, name: string) => [
            `$${value?.toFixed(2)}`, 
            name === "actual" ? "Historical Price" : "AI Prediction"
          ]}
          labelFormatter={(label) => `Date: ${label}`}
        />
        <Line 
          type="monotone" 
          dataKey="actual" 
          stroke="#1E3A8A" 
          strokeWidth={2}
          name="actual"
          connectNulls={false}
          dot={{ r: 3 }}
        />
        <Line 
          type="monotone" 
          dataKey="prediction" 
          stroke="#10B981" 
          strokeWidth={2}
          strokeDasharray="5 5"
          name="prediction"
          connectNulls={false}
          dot={{ r: 4, fill: "#10B981" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
