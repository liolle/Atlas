import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

// const connectionString = process.env.DATABASE_URL as string;
const connectionString = "postgres://postgres:postgres@localhost:5432/atlas";
const sql = postgres(connectionString, { max: 1 });
const db = drizzle(sql);

async function main() {
    console.log("Migration started");
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("Migration ended");
    process.exit(0);
}

main().catch((err) => {
    console.log(err);
    process.exit(0);
});
