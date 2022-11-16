import { deny, rule, shield } from "graphql-shield";
import { verify } from "jsonwebtoken";
import { enviroment } from "~/config/enviroment";
import { db } from "~/db";

const isPublic = rule()(() => true);
const isLoggedIn = rule()(async (_, __, ctx) => {
  // There is no token
  if (!ctx.user) return false;

  // Incorrect auth for given address
  const address: string = ctx.user.address;
  const user = await db.selectFrom("auth").where("address", "=", address).selectAll().executeTakeFirst();
  if (user && user.access_token !== ctx.user.access_token) return false;

  verify(ctx.user.access_token, enviroment.ACCESS_TOKEN_SECRET);
  return true;
});

export const permissions = shield({
  Query: {
    "*": deny,
    me: isLoggedIn,
  },
  Mutation: {
    "*": deny,
    login: isPublic,
    logout: isLoggedIn,
    refresh: isPublic,
    authenticationCode: isPublic,
  },
});
