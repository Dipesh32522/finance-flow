import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { EMIResults } from '@/lib/calculations';
import { formatCurrency } from '@/lib/export-utils';

interface EMIChartProps {
  results: EMIResults;
}

const EMIChart = ({ results }: EMIChartProps) => {
  const data = [
    {
      name: 'Principal',
      value: results.totalAmount - results.totalInterest,
      color: 'var(--primary-500)'
    },
    {
      name: 'Interest',
      value: results.totalInterest,
      color: 'var(--accent-500)'
    }
  ];

  const COLORS = ['hsl(210, 79%, 46%)', 'hsl(14, 100%, 57%)'];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-gray-600">{formatCurrency(data.value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4 text-center">Principal vs Interest Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value, entry) => (
              <span style={{ color: entry.color }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EMIChart;
