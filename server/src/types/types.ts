export interface IUserDocument extends Document {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  password: string;
  refreshToken?: string;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

export interface ITaskDocument extends Document {
  title: string;
  description?: string;
  isCompleted: boolean;
  user: IUserDocument["_id"];
  createdAt: Date;
  updatedAt: Date;
}
