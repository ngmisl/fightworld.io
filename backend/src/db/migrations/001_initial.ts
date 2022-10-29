import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("user")
    .addColumn("address", "varchar(50)", (col) => col.primaryKey())
    .execute();

    await db.schema
    .createTable("auth")
    .addColumn("address", "varchar(50)", (col) =>col.primaryKey().references("user.address").onDelete('cascade'))
    .addColumn("code", "integer", (col) => col.notNull())
    .addColumn("refresh_token", "varchar(50)")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("user").execute();
  await db.schema.dropTable("auth").execute();
}
