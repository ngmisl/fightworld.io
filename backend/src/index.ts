import type { core } from "nexus";

import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import cookieParser from "cookie-parser";

import { createContext } from "./context";
import { createSchema, createTypegenSchema } from "./schema";
import { types } from "./modules";
import { applyMiddleware } from "graphql-middleware";
import { permissions } from "./modules/permissions";

export const start = async (schema: core.NexusGraphQLSchema, port: string) => {
  const app = express();
  const httpServer = http.createServer(app);

  const schemaWithPermissions = applyMiddleware(schema, permissions);

  app.use(cookieParser())

  const server = new ApolloServer({
    context: createContext,
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    schema: schemaWithPermissions,
  });
  await server.start();

  server.applyMiddleware({ app, cors: {
    origin: ['http://localhost:5173', 'https://studio.apollographql.com'],
    credentials: true,
  } });
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
};

start(createSchema("src/schema.graphql", types), "4000");

createTypegenSchema("src/graphql-types.ts", types);
