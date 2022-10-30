import { makeSchema } from "nexus";
import { join } from "path";

export const createSchema = (path: string, types: any) =>
  makeSchema({
    types,
    outputs: {
      schema: join(process.cwd(), path),
    },
  });

export const createTypegenSchema = (outputFilePath: string, types: any) =>
  makeSchema({
    features: {
      abstractTypeStrategies: { isTypeOf: true },
    },
    contextType: {
			module: require.resolve("../context"),
			alias: "Context",
			export: "Context",
		},
    types,
    outputs: {
      typegen: join(process.cwd(), outputFilePath),
    },
    sourceTypes: {
      modules: [
        {
          module: join(process.cwd(), "src", "db", "database-schema.d.ts"),
          alias: "db",
        },
      ],
    },
  });
