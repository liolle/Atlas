import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL as string;

const client = postgres(connectionString, {
  idle_timeout: 20,
  max_lifetime: 60 * 5
});

export const dzClient = drizzle(client, { schema: schema });
