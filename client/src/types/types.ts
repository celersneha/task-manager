// 1. Context object
export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    username: string,
    fullName: string
  ) => Promise<User | null>;
}

export interface User {
  _id: string;
  email: string;
  username: string;
  fullName: string;
}
