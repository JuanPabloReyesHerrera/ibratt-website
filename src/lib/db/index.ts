import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL no está definida");
}

const client = postgres(process.env.DATABASE_URL!, {
  prepare: false, // requerido para Transaction pooler (pgbouncer)
});

export const db = drizzle(client, { schema });
