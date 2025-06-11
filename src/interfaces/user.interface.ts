export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  isActive: boolean;
  isAdmin: boolean;
  lastLogin?: Date | null;
  profilePictureUrl?: string | null;
  createdAt: Date;
  updatedAt?: Date;
}

export interface UserCreate {
  email: string;
  name: string;
  password: string;
  isActive?: boolean;
  isAdmin?: boolean;
  profilePictureUrl?: string;
}

export interface UserModel {
  create(data: UserCreate): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  update(id: string, data: Partial<User>): Promise<User>;
}

export interface UserQuerystring {
  email: string;
}
