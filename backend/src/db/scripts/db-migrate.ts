import { promises as fs } from "fs";
import { FileMigrationProvider, MigrationResultSet, Migrator } from "kysely";
import * as path from "path";
import { db } from "..";

const createMigrator = () =>
  new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(process.cwd(), "src", "db", "migrations"),
    }),
  });

const processResult = ({ error, results }: MigrationResultSet) => {
  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`Migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`Failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error(error);
    console.error("Failed to migrate database. Terminating process.");
    process.exit(1);
  }
};

export const migrateToLatest = async () => {
  console.log("Executing db migrations");
  const result = await createMigrator().migrateToLatest();
  processResult(result);
};

export const migrateDown = async () => {
  console.log("Migrating db down");
  const result = await createMigrator().migrateDown();
  processResult(result);
};
