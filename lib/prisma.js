// import { PrismaClient } from '@prisma/client'

// const globalForPrisma = globalThis

// const prisma = globalForPrisma.prisma ?? new PrismaClient()

// if (process.env.NODE_ENV !== 'production') {
//   globalForPrisma.prisma = prisma
// }

// export default prisma

// import { PrismaClient } from '../generated/prisma'

// const globalForPrisma = globalThis

// // Debug: check if env is loaded
// if (!process.env.DATABASE_URL) {
//   console.error('❌ DATABASE_URL is missing')
// } else {
//   console.log('✅ DATABASE_URL loaded')
// }

// const db =
//   globalForPrisma.prisma ||
//   new PrismaClient()

// if (process.env.NODE_ENV !== 'production') {
//   globalForPrisma.prisma = db
// }

// export default db

import { PrismaClient } from '../generated/client/client'; // ✅ Import from generated path
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = globalThis.prisma || new PrismaClient({ adapter }); // ✅ Adapter required

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
export default prisma;   