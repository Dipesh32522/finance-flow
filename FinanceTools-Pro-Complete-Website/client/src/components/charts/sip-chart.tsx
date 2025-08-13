import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { SIPResults } from '@/lib/calculations';
import { formatCurrency } from '@/lib/export-utils';

interface SIPChartProps {
  results: SIPResults;
}

const SIPChart = ({ results }: SIPChartProps) => {
  const chartData = results.yearlyBreakdown.map(entry => ({
    year: entry.year,
    invested: entry.investedAmount,
    returns: entry.interestEarned,
    total: entry.totalValue
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-medium mb-2">Year {label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4 text-center">Investment Growth Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="year" 
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: '#e0e0e0' }}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: '#e0e0e0' }}
            tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="invested"
            stackId="1"
            stroke="hsl(134, 41%, 41%)"
            fill="hsl(134, 41%, 41%)"
            fillOpacity={0.6}
            name="Invested Amount"
          />
          <Area
            type="monotone"
            dataKey="returns"
            stackId="1"
            stroke="hsl(14, 100%, 57%)"
            fill="hsl(14, 100%, 57%)"
            fillOpacity={0.6}
            name="Returns"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SIPChart;