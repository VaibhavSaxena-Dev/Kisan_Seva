import { apiClient } from '@/lib/api';

// API for todo operations using server backend
export const todoApi = {
  // Get all todos
  getAll: async () => {
    const response = await apiClient.getTodos();
    return response.todos;
  },

  // Add a new todo
  add: async (title: string, description?: string) => {
    const response = await apiClient.addTodo({ title, description });
    return response.todo;
  },

  // Update a todo
  update: async (id: string, updates: { title?: string; description?: string; completed?: boolean }) => {
    const response = await apiClient.updateTodo(id, updates);
    return response.todo;
  },

  // Toggle todo completion status
  toggleComplete: async (id: string) => {
    const response = await apiClient.toggleTodo(id);
    return response.todo;
  },

  // Delete a todo
  delete: async (id: string) => {
    await apiClient.deleteTodo(id);
  },
};

