import { TodoItem, createTodoItem } from './TodoItem';

// TodoStore class for managing todo items
export class TodoStore {
  private items: TodoItem[] = [];
  private listeners: (() => void)[] = [];

  constructor() {
    // Load from localStorage if available
    this.loadFromStorage();
  }

  // Get all todo items
  getAll(): TodoItem[] {
    return [...this.items];
  }

  // Add a new todo
  add(title: string, description?: string): TodoItem {
    const newItem = createTodoItem(title, description);
    this.items.push(newItem);
    this.saveToStorage();
    this.notifyListeners();
    return newItem;
  }

  // Update a todo
  update(id: string, updates: { title?: string; description?: string; completed?: boolean }): TodoItem | null {
    const item = this.items.find(i => i.id === id);
    if (!item) return null;

    if (updates.title !== undefined) item.title = updates.title;
    if (updates.description !== undefined) item.description = updates.description;
    if (updates.completed !== undefined) item.completed = updates.completed;
    item.updatedAt = new Date();

    this.saveToStorage();
    this.notifyListeners();
    return item;
  }

  // Toggle todo completion status
  toggleComplete(id: string): TodoItem | null {
    const item = this.items.find(i => i.id === id);
    if (!item) return null;

    item.completed = !item.completed;
    item.updatedAt = new Date();

    this.saveToStorage();
    this.notifyListeners();
    return item;
  }

  // Delete a todo
  delete(id: string): boolean {
    const index = this.items.findIndex(i => i.id === id);
    if (index === -1) return false;

    this.items.splice(index, 1);
    this.saveToStorage();
    this.notifyListeners();
    return true;
  }

  // Subscribe to changes
  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notify all listeners
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }

  // Save to localStorage
  private saveToStorage(): void {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('todos', JSON.stringify(this.items));
      }
    } catch (error) {
      console.error('Failed to save todos to localStorage:', error);
    }
  }

  // Load from localStorage
  private loadFromStorage(): void {
    try {
      if (typeof window !== 'undefined') {
        const storedItems = localStorage.getItem('todos');
        if (storedItems) {
          const parsed = JSON.parse(storedItems);
          if (Array.isArray(parsed)) {
            this.items = parsed.map(item => ({
              ...item,
              createdAt: new Date(item.createdAt),
              updatedAt: new Date(item.updatedAt),
            }));
          }
        }
      }
    } catch (error) {
      console.error('Failed to load todos from localStorage:', error);
    }
  }
}

