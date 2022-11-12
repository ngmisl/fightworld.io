import { migrateDown } from "./db-migrate";

migrateDown()
  .then(() => console.log("Database successfully downgraded to previous version"))
  .catch((error) => console.error(error))
  .finally(() => process.exit(0));
