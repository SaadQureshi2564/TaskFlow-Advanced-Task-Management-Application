import { NextRequest, NextResponse } from 'next/server';
import { taskApi } from '@/lib/api';
import { getServerSession } from 'next-auth';
import { Task } from '@/types';

// GET /api/tasks
export async function GET() {
  try {
    const tasks = await taskApi.getTasks();
    return NextResponse.json(tasks);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST /api/tasks
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const taskData = await request.json();
    
    // Add the current user as the creator
    const task = {
      ...taskData,
      createdBy: (session.user as any)?.id || '1', // Fallback for demo purposes
    };
    
    const newTask = await taskApi.createTask(task as Omit<Task, 'id' | 'createdAt' | 'updatedAt'>);
    
    return NextResponse.json(newTask, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}