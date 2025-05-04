'use client';

import { useState } from 'react';
import { useTeams } from '@/hooks/useTeams';
import TeamCard from '@/components/teams/TeamCard';
import TeamForm from '@/components/teams/TeamForm';
import Button from '@/components/ui/Button';
import { Team } from '@/types';
import { useRouter } from 'next/navigation';

export default function TeamsPage() {
  const router = useRouter();
  const { teams, isLoading, error, createTeam, updateTeam, deleteTeam } = useTeams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<Team | undefined>(undefined);
  
  const handleCreateTeam = () => {
    setCurrentTeam(undefined);
    setIsModalOpen(true);
  };
  
  const handleEditTeam = (teamId: string) => {
    const team = teams.find((t) => t.id === teamId);
    if (team) {
      setCurrentTeam(team);
      setIsModalOpen(true);
    }
  };
  
  const handleDeleteTeam = (teamId: string) => {
    if (typeof window !== 'undefined' && window.confirm('Are you sure you want to delete this team?')) {
      deleteTeam(teamId);
    }
  };
  
  const handleViewTasks = (teamId: string) => {
    router.push(`/teams/${teamId}/tasks`);
  };
  
  const handleSubmitTeam = (teamData: Partial<Team>) => {
    if (currentTeam) {
      updateTeam({ id: currentTeam.id, updates: teamData });
    } else {
      createTeam({
        ...teamData,
        createdBy: '1', // Mocked user ID
        members: teamData.members || [],
      } as any);
    }
    setIsModalOpen(false);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  if (isLoading) {
    return <div className="flex justify-center p-8">Loading teams...</div>;
  }
  
  if (error) {
    return <div className="text-red-500 p-8">Error loading teams: {String(error)}</div>;
  }
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Teams</h1>
        <Button onClick={handleCreateTeam}>Create New Team</Button>
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {currentTeam ? 'Edit Team' : 'Create Team'}
            </h2>
            <TeamForm 
              team={currentTeam}
              onSubmit={handleSubmitTeam}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.length > 0 ? (
          teams.map((team) => (
            <TeamCard 
              key={team.id}
              team={team}
              onEdit={handleEditTeam}
              onDelete={handleDeleteTeam}
              onViewTasks={handleViewTasks}
            />
          ))
        ) : (
          <div className="col-span-3 text-center py-8">
            <p className="text-gray-500">No teams found</p>
            <p className="mt-2">
              <Button onClick={handleCreateTeam}>Create your first team</Button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
