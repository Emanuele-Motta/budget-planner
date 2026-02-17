import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export const ExpenseTrendChart = ({ data }: { data: Array<{ name: string; value: number }> }) => (
  <ResponsiveContainer width='100%' height={280}>
    <LineChart data={data}>
      <XAxis dataKey='name' />
      <YAxis />
      <Tooltip />
      <Line type='monotone' dataKey='value' stroke='#1976d2' strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
);
