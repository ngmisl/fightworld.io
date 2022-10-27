import { DialectManager, Generator } from "kysely-codegen";

const outFile = "./src/db/database-schema.d.ts";
const database = "dev";
const host = "localhost";
const password = "Kalle123";
const user = "postgres";

const initGenerator = async () => {
  try {
    const generator = new Generator({
      camelCase: false,
      connectionString: `postgresql://${user}:${password}@${host}/${database}`,
      dialect: new DialectManager().getDialect("postgres"),
    });
    await generator.generate({ outFile });
    console.log(`Schema written to ${outFile}`);
  } catch (error) {
    console.error(error);
  }
};
initGenerator();
