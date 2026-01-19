import { PrismaPg } from "@prisma/adapter-pg";

const prismaClientSingleton = async () => {
  const { PrismaClient } = await import("@prisma/client");
  const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  return new PrismaClient({ adapter: pool });
};

type PrismaClientSingleton = Awaited<ReturnType<typeof prismaClientSingleton>>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

let prismaPromise: Promise<PrismaClientSingleton> | undefined;

export const getPrisma = async () => {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  if (!prismaPromise) {
    prismaPromise = prismaClientSingleton();
  }

  const prisma = await prismaPromise;

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
  }

  return prisma;
};
