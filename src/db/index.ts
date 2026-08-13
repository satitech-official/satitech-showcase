import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const globalForDb = globalThis as typeof globalThis & {
  __satiPortfolioPool?: Pool;
};

export function getDatabase() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) return null;

  const pool = globalForDb.__satiPortfolioPool ?? new Pool({
    connectionString: databaseUrl,
    max: 4,
    idleTimeoutMillis: 20_000,
    connectionTimeoutMillis: 5_000,
  });

  if (process.env.NODE_ENV !== "production") globalForDb.__satiPortfolioPool = pool;
  return drizzle(pool);
}
