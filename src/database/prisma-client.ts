import { Prisma, PrismaClient } from '../generated/prisma/client.js';

const prismaClient = new PrismaClient();

export { Prisma as prisma, prismaClient };
