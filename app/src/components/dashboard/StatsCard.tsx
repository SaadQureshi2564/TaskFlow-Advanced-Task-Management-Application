import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/solid';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export default function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
}: StatsCardProps) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex items-center">
        {icon && <div className="mr-4">{icon}</div>}
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {description && <p className="text-sm text-gray-500">{description}</p>}
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          {trend === 'up' && <ArrowUpIcon className="h-5 w-5 text-green-500" />}
          {trend === 'down' && <ArrowDownIcon className="h-5 w-5 text-red-500" />}
          {trendValue && <span className="ml-2 text-sm text-gray-500">{trendValue}</span>}
        </div>
      )}
    </div>
  );
}