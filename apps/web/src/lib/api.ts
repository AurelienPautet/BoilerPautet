import type { User } from "@repo/shared";

const API_BASE = "/api";

interface ApiErrorBody {
  error: string;
  message?: string;
  details?: Record<string, string[]>;
}

export class ApiError extends Error {
  status: number;
  body: ApiErrorBody;

  constructor(status: number, body: ApiErrorBody) {
    super(body.message ?? body.error);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let body: ApiErrorBody;
    try {
      body = await res.json();
    } catch {
      body = { error: res.statusText || "Request failed" };
    }
    throw new ApiError(res.status, body);
  }
  return res.json();
}

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE}/users`);
  return handleResponse<User[]>(res);
}

export async function fetchUser(id: string): Promise<User> {
  const res = await fetch(`${API_BASE}/users/${id}`);
  return handleResponse<User>(res);
}

export async function createUser(
  data: Pick<User, "name" | "email">
): Promise<User> {
  const res = await fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<User>(res);
}

export async function deleteUser(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/users/${id}`, { method: "DELETE" });
  if (!res.ok) {
    let body: ApiErrorBody;
    try {
      body = await res.json();
    } catch {
      body = { error: "Failed to delete user" };
    }
    throw new ApiError(res.status, body);
  }
}
