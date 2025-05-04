export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'admin' | 'user';
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  createdBy: string;
  teamId?: string;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  members: string[];
  createdBy: string;
}

export interface Comment {
  id: string;
  content: string;
  taskId: string;
  createdBy: string;
  createdAt: string;
}
