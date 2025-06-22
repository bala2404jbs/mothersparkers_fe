export interface AuthUser {
  id: number;
  username: string;
  role: string;
}

export interface LoginResponse {
  user: AuthUser;
  message: string;
}

export const STATIC_CREDENTIALS = {
  username: "admin",
  password: "procurement2024"
} as const;

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  return response.json();
};

export const logout = () => {
  localStorage.removeItem("auth_user");
  window.location.href = "/";
};

export const getStoredUser = (): AuthUser | null => {
  try {
    const stored = localStorage.getItem("auth_user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const storeUser = (user: AuthUser) => {
  localStorage.setItem("auth_user", JSON.stringify(user));
};

export const clearStoredUser = () => {
  localStorage.removeItem("auth_user");
};
