import { PrismaClient, Prisma } from "../generated/prisma/client.js";

const prismaClient = new PrismaClient();

export { prismaClient, Prisma as prisma };
