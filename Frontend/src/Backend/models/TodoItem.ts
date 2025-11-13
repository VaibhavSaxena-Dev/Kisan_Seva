// TodoItem model
export interface TodoItem {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Create a new TodoItem
export const createTodoItem = (title: string, description?: string): TodoItem => {
  const now = new Date();
  return {
    id: `todo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title,
    description,
    completed: false,
    createdAt: now,
    updatedAt: now,
  };
};

