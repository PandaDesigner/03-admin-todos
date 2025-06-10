/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '../generated/prisma/index';

// Declare global
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!(global as any).prisma) {
        (global as any).prisma = new PrismaClient();
    }
    prisma = (global as any).prisma;
}

export default prisma;