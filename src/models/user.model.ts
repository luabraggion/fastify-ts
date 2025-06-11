import bcrypt from 'bcrypt';

import { prismaClient } from '../database/prisma-client.js';
import { User, UserCreate, UserModel } from '../interfaces/user.interface.js';

class UserModelProperties implements UserModel {
  async create(data: UserCreate): Promise<User> {
    const result = await prismaClient.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: await bcrypt.hash(data.password ?? '', 10),
        isActive: data.isActive,
        isAdmin: data.isAdmin,
        profilePictureUrl: data.profilePictureUrl,
      },
    });
    return result;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await prismaClient.user.findUnique({
      where: { email },
    });
    return user || null;
  }
  async findById(id: string): Promise<User | null> {
    const user = await prismaClient.user.findUnique({
      where: { id },
    });
    return user || null;
  }
  async update(id: string, data: Partial<User>): Promise<User> {
    const updatedUser = await prismaClient.user.update({
      where: { id },
      data: {
        ...data,
        password: data.password
          ? await bcrypt.hash(data.password, 10)
          : undefined,
      },
    });
    return updatedUser;
  }
}

export { UserModelProperties };
