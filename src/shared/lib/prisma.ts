import { PrismaClient } from '@prisma/client';

type GlobalWithPrisma = typeof globalThis & {
  prisma?: PrismaClient;
};

const globalWithPrisma = globalThis as GlobalWithPrisma;
const prisma = globalWithPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalWithPrisma.prisma = prisma;
}

export default prisma;
