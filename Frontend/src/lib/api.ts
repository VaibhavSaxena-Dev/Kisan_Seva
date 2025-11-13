const API_BASE_URL = (import.meta.env as { __VITE_API_URL__?: string }).__VITE_API_URL__ || 'http://localhost:5000/api';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  lastLogin?: string;
  profile?: Record<string, unknown>;
}

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

interface HygieneTest {
  id: string;
  farmType: string;
  answers: number[];
  score: number;
  percentage: number;
  completedAt: string;
}

interface AuditLog {
  id: string;
  event: string;
  email: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async register(data: { name: string; email: string; password: string }) {
    const response = await this.request<{ token: string; user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    // Store token
    localStorage.setItem('auth_token', response.token);

    return response;
  }

  async login(data: { email: string; password: string }) {
    const response = await this.request<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    // Store token
    localStorage.setItem('auth_token', response.token);

    return response;
  }

  async logout() {
    const response = await this.request<{ message: string }>('/auth/logout', {
      method: 'POST',
    });

    // Remove token
    localStorage.removeItem('auth_token');

    return response;
  }

  async getProfile() {
    return this.request<{ user: User }>('/auth/profile');
  }

  // Todo endpoints
  async getTodos() {
    return this.request<{ todos: Todo[] }>('/todos');
  }

  async addTodo(data: { title: string; description?: string }) {
    return this.request<{ todo: Todo }>('/todos', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTodo(id: string, data: { title?: string; description?: string; completed?: boolean }) {
    return this.request<{ todo: Todo }>(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async toggleTodo(id: string) {
    return this.request<{ todo: Todo }>(`/todos/${id}/toggle`, {
      method: 'PATCH',
    });
  }

  async deleteTodo(id: string) {
    return this.request<{ message: string }>(`/todos/${id}`, {
      method: 'DELETE',
    });
  }

  // Hygiene test endpoints
  async getHygieneTests() {
    return this.request<{ hygieneTests: HygieneTest[] }>('/hygiene-tests');
  }

  async submitHygieneTest(data: {
    farmType: string;
    answers: number[];
    score: number;
  }) {
    return this.request<{ test: HygieneTest }>('/hygiene-tests', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getHygieneTest(id: string) {
    return this.request<{ test: HygieneTest }>(`/hygiene-tests/${id}`);
  }

  async deleteHygieneTest(id: string) {
    return this.request<{ message: string }>(`/hygiene-tests/${id}`, {
      method: 'DELETE',
    });
  }

  // Audit log endpoints
  async getAuditLogs() {
    return this.request<{ logs: AuditLog[] }>('/audit-logs');
  }

  async logAuditEvent(event: string, metadata?: Record<string, unknown>) {
    return this.request<{ log: AuditLog }>('/audit-logs', {
      method: 'POST',
      body: JSON.stringify({ event, metadata }),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
