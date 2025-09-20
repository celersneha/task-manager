export interface AuthContextType {
  user: User | null;
  login: (email?: string, password?: string, username?: string) => Promise<any>;
  logout: () => Promise<void>;
  register: (
    fullName: string,
    email: string,
    username: string,
    password: string
  ) => Promise<any>;
  loading: boolean;
}

export interface User {
  _id: string;
  email: string;
  username: string;
  fullName: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  user: string;
  createdAt: string;
  updatedAt: string;
}
