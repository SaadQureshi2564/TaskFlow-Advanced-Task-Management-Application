import { Task } from '@/types';

interface TaskCardProps {
  task: Task;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  // Status badge styles
  const statusClasses = {
    'todo': 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    'review': 'bg-blue-100 text-blue-800',
    'done': 'bg-green-100 text-green-800',
  };
  
  // Priority badge styles
  const priorityClasses = {
    'low': 'bg-green-100 text-green-800',
    'medium': 'bg-yellow-100 text-yellow-800',
    'high': 'bg-red-100 text-red-800',
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-medium">{task.title}</h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => onEdit(task.id)}
            className="text-gray-500 hover:text-primary-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button 
            onClick={() => onDelete(task.id)}
            className="text-gray-500 hover:text-red-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {task.description && (
        <p className="text-gray-600 dark:text-gray-400 mb-4">{task.description}</p>
      )}
      
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusClasses[task.status as keyof typeof statusClasses]}`}>
          {task.status}
        </span>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${priorityClasses[task.priority as keyof typeof priorityClasses]}`}>
          {task.priority}
        </span>
      </div>
      
      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
        <div>
          {task.dueDate && (
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>
        <div>
          {task.assignedTo && (
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Assigned to: {task.assignedTo}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
