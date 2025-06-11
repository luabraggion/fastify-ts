import { User, UserCreate, UserModel } from '../interfaces/user.interface.js';
import { UserModelProperties } from '../models/user.model.js';

class UserController {
  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModelProperties();
  }

  async create({
    email,
    name,
    password,
    isActive,
    isAdmin,
    profilePictureUrl,
  }: UserCreate): Promise<User> {
    const verifyIfUserExists = await this.userModel.findByEmail(email);
    if (verifyIfUserExists) {
      throw new Error('Email already exists');
    }
    const result = await this.userModel.create({
      email,
      name,
      password,
      isActive,
      isAdmin,
      profilePictureUrl,
    });
    return result;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

export { UserController };
