import { migrateToLatest } from "./db-migrate";

migrateToLatest()
  .then(() => console.log("Database successfully migrated to latest"))
  .catch((error) => console.error(error))
  .finally(() => {
    process.exit(0);
  });
