import { prismaClient, prisma } from "../database/prisma-client.js";
import { User, UserCreate, UserModel } from "../interfaces/user.interface.js";
import bcrypt from "bcrypt";

class UserModelProperties implements UserModel {
  async create(data: UserCreate): Promise<User> {
    try {
      const result = await prismaClient.user.create({
        data: {
          email: data.email,
          name: data.name,
          password: await bcrypt.hash(data.password ?? "", 10),
          isActive: data.isActive,
          isAdmin: data.isAdmin,
          profilePictureUrl: data.profilePictureUrl,
        },
      });
      return result;
    } catch (e) {
      throw e;
    }
  }
  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await prismaClient.user.findUnique({
        where: { email },
      });
      return user || null;
    } catch (e) {
      throw e;
    }
  }
  async findById(id: string): Promise<User | null> {
    try {
      const user = await prismaClient.user.findUnique({
        where: { id },
      });
      return user || null;
    } catch (e) {
      throw e;
    }
  }
  async update(id: string, data: Partial<User>): Promise<User> {
    try {
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
    } catch (e) {
      throw e;
    }
  }
}

export { UserModelProperties };
