const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include",
      mode: "cors",
      ...options,
    };

    // Add token
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Network error" }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // ---------- AUTH ----------
  async register(data: { name: string; email: string; password: string }) {
    const response = await this.request<{ token: string; user: User }>(
      "/api/auth/register",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    localStorage.setItem("auth_token", response.token);
    return response;
  }

  async login(data: { email: string; password: string }) {
    const response = await this.request<{ token: string; user: User }>(
      "/api/auth/login",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    localStorage.setItem("auth_token", response.token);
    return response;
  }

  async logout() {
    const response = await this.request<{ message: string }>(
      "/api/auth/logout",
      { method: "POST" }
    );

    localStorage.removeItem("auth_token");
    return response;
  }

  async getProfile() {
    return this.request<{ user: User }>("/api/auth/profile");
  }

  // ---------- TODOS ----------
  async getTodos() {
    return this.request<{ todos: Todo[] }>("/api/todos");
  }

  async addTodo(data: { title: string; description?: string }) {
    return this.request<{ todo: Todo }>("/api/todos", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateTodo(id: string, data: any) {
    return this.request<{ todo: Todo }>(`/api/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async toggleTodo(id: string) {
    return this.request<{ todo: Todo }>(`/api/todos/${id}/toggle`, {
      method: "PATCH",
    });
  }

  async deleteTodo(id: string) {
    return this.request<{ message: string }>(`/api/todos/${id}`, {
      method: "DELETE",
    });
  }

  // ---------- HYGIENE TEST ----------
  async getHygieneTests() {
    return this.request<{ hygieneTests: HygieneTest[] }>("/api/hygiene-tests");
  }

  async submitHygieneTest(data: any) {
    return this.request<{ test: HygieneTest }>("/api/hygiene-tests", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getHygieneTest(id: string) {
    return this.request<{ test: HygieneTest }>(`/api/hygiene-tests/${id}`);
  }

  async deleteHygieneTest(id: string) {
    return this.request<{ message: string }>(`/api/hygiene-tests/${id}`, {
      method: "DELETE",
    });
  }

  // ---------- AUDIT ----------
  async getAuditLogs() {
    return this.request<{ logs: AuditLog[] }>("/api/audit-logs");
  }

  async logAuditEvent(event: string, metadata?: any) {
    return this.request<{ log: AuditLog }>("/api/audit-logs", {
      method: "POST",
      body: JSON.stringify({ event, metadata }),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
