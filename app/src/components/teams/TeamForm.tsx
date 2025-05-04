'use client';

import { useState, useEffect } from 'react';
import { Team } from '@/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface TeamFormProps {
  team?: Team;
  onSubmit: (team: Partial<Team>) => void;
  onCancel: () => void;
}

export default function TeamForm({ team, onSubmit, onCancel }: TeamFormProps) {
  const [formData, setFormData] = useState<Partial<Team>>({
    name: '',
    description: '',
    members: [],
  });

  useEffect(() => {
    if (team) {
      setFormData({
        name: team.name,
        description: team.description || '',
        members: team.members,
      });
    }
  }, [team]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Team Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {team ? 'Update Team' : 'Create Team'}
        </Button>
      </div>
    </form>
  );
}
