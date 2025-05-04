'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Example data - in a real app this would come from props
const defaultData = [
  { name: 'Day 1', completed: 4 },
  { name: 'Day 2', completed: 3 },
  { name: 'Day 3', completed: 2 },
  { name: 'Day 4', completed: 6 },
  { name: 'Day 5', completed: 5 },
  { name: 'Day 6', completed: 8 },
  { name: 'Day 7', completed: 7 },
];

interface TaskCompletionChartProps {
  data?: typeof defaultData;
  title?: string;
}

export default function TaskCompletionChart({ 
  data = defaultData,
  title = 'Tasks Completed'
}: TaskCompletionChartProps) {
  const [timeFrame, setTimeFrame] = useState<'week' | 'month'>('week');
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeFrame('week')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeFrame === 'week'
                ? 'bg-primary-100 text-primary-800'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeFrame('month')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeFrame === 'month'
                ? 'bg-primary-100 text-primary-800'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Month
          </button>
        </div>
      </div>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="name" 
              tickLine={false}
              axisLine={false}
              fontSize={12}
              tick={{ fill: '#9CA3AF' }}
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              fontSize={12}
              tick={{ fill: '#9CA3AF' }}
            />
            <Tooltip />
            <Bar 
              dataKey="completed" 
              name="Tasks Completed"
              fill="#3B82F6" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
