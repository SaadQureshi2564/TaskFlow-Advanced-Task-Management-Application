'use client';

import { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import TaskCard from '@/components/tasks/TaskCard';
import TaskForm from '@/components/tasks/TaskForm';
import Button from '@/components/ui/Button';
import { Task } from '@/types';

export default function TasksPage() {
  const { tasks, isLoading, error, createTask, updateTask, deleteTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);
  
  const handleCreateTask = () => {
    setCurrentTask(undefined);
    setIsModalOpen(true);
  };
  
  const handleEditTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setCurrentTask(task);
      setIsModalOpen(true);
    }
  };
  
  const handleDeleteTask = (taskId: string) => {
    if (typeof window !== 'undefined' && window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
    }
  };
  
  const handleSubmitTask = (taskData: Partial<Task>) => {
    if (currentTask) {
      updateTask({ id: currentTask.id, updates: taskData });
    } else {
      const newTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt'> = {
        ...taskData,
        createdBy: '1',
        status: taskData.status || 'todo',
        priority: taskData.priority || 'medium',
      } as Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
      createTask(newTask);
    }
    setIsModalOpen(false);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  // Group tasks by status
  const tasksByStatus = {
    todo: tasks.filter(task => task.status === 'todo'),
    'in-progress': tasks.filter(task => task.status === 'in-progress'),
    review: tasks.filter(task => task.status === 'review'),
    done: tasks.filter(task => task.status === 'done'),
  };
  
  if (isLoading) {
    return <div className="flex justify-center p-8">Loading tasks...</div>;
  }
  
  if (error) {
    return <div className="text-red-500 p-8">Error loading tasks: {String(error)}</div>;
  }
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <Button onClick={handleCreateTask}>Create New Task</Button>
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {currentTask ? 'Edit Task' : 'Create Task'}
            </h2>
            <TaskForm 
              task={currentTask}
              onSubmit={handleSubmitTask}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* To-do column */}
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">To-do</h2>
          <div className="space-y-4">
            {tasksByStatus.todo.length > 0 ? (
              tasksByStatus.todo.map((task) => (
                <TaskCard 
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No tasks</p>
            )}
          </div>
        </div>
        
        {/* In Progress column */}
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">In Progress</h2>
          <div className="space-y-4">
            {tasksByStatus['in-progress'].length > 0 ? (
              tasksByStatus['in-progress'].map((task) => (
                <TaskCard 
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No tasks</p>
            )}
          </div>
        </div>
        
        {/* Review column */}
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Review</h2>
          <div className="space-y-4">
            {tasksByStatus.review.length > 0 ? (
              tasksByStatus.review.map((task) => (
                <TaskCard 
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No tasks</p>
            )}
          </div>
        </div>
        
        {/* Done column */}
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Done</h2>
          <div className="space-y-4">
            {tasksByStatus.done.length > 0 ? (
              tasksByStatus.done.map((task) => (
                <TaskCard 
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No tasks</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
