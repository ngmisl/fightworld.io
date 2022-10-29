import type { core } from "nexus";

import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";

import { createContext } from "./context";
import { createSchema, createTypegenSchema } from "./schema";
import { types } from "./modules";
import { applyMiddleware } from "graphql-middleware";
import { permissions } from "./modules/permissions";

export const start = async (schema: core.NexusGraphQLSchema, port: string) => {
  const app = express();
  const httpServer = http.createServer(app);

  const schemaWithPermissions = applyMiddleware(schema, permissions)

  const server = new ApolloServer({
    cache: "bounded",
    context: createContext,
    csrfPrevention: true,
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    schema: schemaWithPermissions,
  });
  await server.start();

  server.applyMiddleware({ app });
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
};

start(createSchema("src/schema.graphql", types), "4000");

createTypegenSchema("src/graphql-types.ts", types);
