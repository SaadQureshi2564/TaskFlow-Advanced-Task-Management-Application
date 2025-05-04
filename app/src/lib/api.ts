import { Task, Team, User, Comment } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// Mock data
let tasks: Task[] = [];

let teams: Team[] = [];

const users: User[] = [];

let comments: Comment[] = [];

// Task API
export const taskApi = {
  async getTasks(): Promise<Task[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [...tasks];
  },
  async getTaskById(id: string): Promise<Task | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return tasks.find((task) => task.id === id);
  },
  async createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const now = new Date().toISOString();
    const newTask: Task = {
      id: uuidv4(),
      ...task,
      createdAt: now,
      updatedAt: now,
    };
    tasks.push(newTask);
    return newTask;
  },
  async updateTask(id: string, updates: Partial<Task>): Promise<Task | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) return undefined;
    const updatedTask = {
      ...tasks[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    tasks[index] = updatedTask;
    return updatedTask;
  },
  async deleteTask(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const initialLength = tasks.length;
    tasks = tasks.filter((task) => task.id !== id);
    return tasks.length < initialLength;
  },
};

// Team API
export const teamApi = {
  async getTeams(): Promise<Team[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [...teams];
  },
  async getTeamById(id: string): Promise<Team | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return teams.find((team) => team.id === id);
  },
  async createTeam(team: Omit<Team, 'id' | 'createdAt' | 'updatedAt'>): Promise<Team> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const now = new Date().toISOString();
    const newTeam: Team = {
      id: uuidv4(),
      ...team,
      createdAt: now,
      updatedAt: now,
    };
    teams.push(newTeam);
    return newTeam;
  },
  async updateTeam(id: string, updates: Partial<Team>): Promise<Team | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = teams.findIndex((team) => team.id === id);
    if (index === -1) return undefined;
    const updatedTeam = {
      ...teams[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    teams[index] = updatedTeam;
    return updatedTeam;
  },
  async deleteTeam(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const initialLength = teams.length;
    teams = teams.filter((team) => team.id !== id);
    return teams.length < initialLength;
  },
};

// User API
export const userApi = {
  async getUsers(): Promise<User[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [...users];
  },
  async getUserById(id: string): Promise<User | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return users.find((user) => user.id === id);
  },
};

// Comment API
export const commentApi = {
  async getCommentsByTaskId(taskId: string): Promise<Comment[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return comments.filter((comment) => comment.taskId === taskId);
  },
  async createComment(comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newComment: Comment = {
      id: uuidv4(),
      ...comment,
      createdAt: new Date().toISOString(),
    };
    comments.push(newComment);
    return newComment;
  },
  async deleteComment(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const initialLength = comments.length;
    comments = comments.filter((comment) => comment.id !== id);
    return comments.length < initialLength;
  },
};