import axios from 'axios';
import type { Task } from '../types';
import type { TaskCreationData } from '../types';

const PROPERTIES_API_URL = 'http://localhost:3001/api/properties';
const TASKS_API_URL = 'http://localhost:3001/api/tasks';

export const getTasksForProperty = async (propertyId: number): Promise<Task[]> => {
  const response = await axios.get(`${PROPERTIES_API_URL}/${propertyId}/tasks`);
  return response.data;
};

export const createTask = async (taskData: TaskCreationData): Promise<Task> => {
  const response = await axios.post(TASKS_API_URL, taskData);
  return response.data;
};

export const updateTask = async (task: Task): Promise<Task> => {
  const response = await axios.put(`${TASKS_API_URL}/${task.id}`, task);
  return response.data;
};

export const deleteTask = async (taskId: number): Promise<void> => {
  await axios.delete(`${TASKS_API_URL}/${taskId}`);
};
