'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Example data - in a real app this would come from props
const defaultData = [
  { name: 'To-do', value: 5, color: '#9CA3AF' },
  { name: 'In Progress', value: 3, color: '#FBBF24' },
  { name: 'Review', value: 2, color: '#3B82F6' },
  { name: 'Done', value: 8, color: '#10B981' },
];

interface TaskStatusChartProps {
  data?: typeof defaultData;
  title?: string;
}

export default function TaskStatusChart({ 
  data = defaultData,
  title = 'Task Status Distribution'
}: TaskStatusChartProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" align="center" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
