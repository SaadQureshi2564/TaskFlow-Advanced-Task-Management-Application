import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { teamApi } from '@/lib/api';
import { Team } from '@/types';

export function useTeams() {
  const queryClient = useQueryClient();
  
  const teamsQuery = useQuery({
    queryKey: ['teams'],
    queryFn: teamApi.getTeams,
  });
  
  const createTeamMutation = useMutation({
    mutationFn: (team: Omit<Team, 'id' | 'createdAt' | 'updatedAt'>) => teamApi.createTeam(team),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
  });
  
  const updateTeamMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string, updates: Partial<Team> }) => 
      teamApi.updateTeam(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
  });
  
  const deleteTeamMutation = useMutation({
    mutationFn: (id: string) => teamApi.deleteTeam(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
  });
  
  return {
    teams: teamsQuery.data || [],
    isLoading: teamsQuery.isLoading,
    error: teamsQuery.error,
    createTeam: createTeamMutation.mutate,
    updateTeam: updateTeamMutation.mutate,
    deleteTeam: deleteTeamMutation.mutate,
  };
}

export function useTeam(id: string) {
  return useQuery({
    queryKey: ['teams', id],
    queryFn: () => teamApi.getTeamById(id),
  });
}
