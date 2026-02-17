import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const colors = ['#1976d2', '#26a69a', '#ef5350', '#ab47bc', '#ffa726'];

export const CategoryPieChart = ({ data }: { data: Array<{ name: string; value: number }> }) => (
  <ResponsiveContainer width='100%' height={280}>
    <PieChart>
      <Pie data={data} dataKey='value' nameKey='name' outerRadius={100}>
        {data.map((_, i) => (
          <Cell key={i} fill={colors[i % colors.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);
