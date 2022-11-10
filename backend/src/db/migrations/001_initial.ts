import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("user")
    .addColumn("address", "varchar(50)", (col) => col.primaryKey())
    .execute();

  await db.schema
    .createTable("auth")
    .addColumn("address", "varchar(50)", (col) => col.primaryKey().references("user.address").onDelete("cascade"))
    .addColumn("code", "integer", (col) => col.notNull())
    .addColumn("refresh_token", "varchar(500)")
    .addColumn("access_token", "varchar(500)")
    .execute();

  await db.schema
    .createTable("character")
    .addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn("address", "varchar(50)", (col) => col.notNull().references("user.address").onDelete("cascade"))
    .addColumn("level", "integer", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("character").execute();
  await db.schema.dropTable("auth").execute();
  await db.schema.dropTable("user").execute();
}
