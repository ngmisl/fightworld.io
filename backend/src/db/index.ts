import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import type { DB } from "./database-schema";

export const db = new Kysely<DB>({
  // Use MysqlDialect for MySQL and SqliteDialect for SQLite.
  dialect: new PostgresDialect({
    pool: new Pool({
      host: "localhost",
      database: "dev",
      password: "Kalle123",
      user: "postgres",
    }),
  }),
});
