import { NextRequest, NextResponse } from 'next/server';
import { teamApi } from '@/lib/api';
import { getServerSession } from 'next-auth';
import { Team } from '@/types';

// GET /api/teams
export async function GET() {
  try {
    const teams = await teamApi.getTeams();
    return NextResponse.json(teams);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch teams' },
      { status: 500 }
    );
  }
}

// POST /api/teams
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const teamData = await request.json();
    
    // Add the current user as the creator
    const team = {
      ...teamData,
      createdBy: (session.user as any)?.id || '1', // Fallback for demo purposes
    };
    
    const newTeam = await teamApi.createTeam(team as Omit<Team, 'id' | 'createdAt' | 'updatedAt'>);
    
    return NextResponse.json(newTeam, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create team' },
      { status: 500 }
    );
  }
}