'use client';

import { useTasks } from '@/hooks/useTasks';
import { useTeams } from '@/hooks/useTeams';

export default function Dashboard() {
  useTasks();
  useTeams();

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Tasks Overview</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>To-do</span>
              <span className="font-medium">5</span>
            </div>
            <div className="flex justify-between">
              <span>In Progress</span>
              <span className="font-medium">3</span>
            </div>
            <div className="flex justify-between">
              <span>Review</span>
              <span className="font-medium">2</span>
            </div>
            <div className="flex justify-between">
              <span>Done</span>
              <span className="font-medium">8</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="border-l-4 border-primary-500 pl-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">1 hour ago</p>
              <p className="font-medium">Task &quot;Implement Dashboard&quot; updated</p>
            </div>
            <div className="border-l-4 border-green-500 pl-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">3 hours ago</p>
              <p className="font-medium">Task &quot;Create Database Schema&quot; completed</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">Yesterday</p>
              <p className="font-medium">New team member added to &quot;Frontend Team&quot;</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Upcoming Deadlines</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">API Integration</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">High Priority</p>
              </div>
              <span className="text-red-500 font-medium">Tomorrow</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">UI Design Review</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Medium Priority</p>
              </div>
              <span className="text-orange-500 font-medium">In 3 days</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Documentation Update</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Low Priority</p>
              </div>
              <span className="text-gray-500 font-medium">Next week</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}