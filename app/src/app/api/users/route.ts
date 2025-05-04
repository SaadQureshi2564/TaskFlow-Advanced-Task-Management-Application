import { NextResponse } from 'next/server';
import { userApi } from '@/lib/api';
import { getServerSession } from 'next-auth';

// GET /api/users
export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const users = await userApi.getUsers();
    
    // Don't expose sensitive information
    const safeUsers = users.map(({ id, name, email, role }) => ({
      id,
      name,
      email,
      role,
    }));
    
    return NextResponse.json(safeUsers);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}