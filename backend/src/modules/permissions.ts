import { deny, rule, shield } from "graphql-shield";
import { db } from "~/db";

const isPublic = rule()(() => true);
const isLoggedIn = rule()(async (_, __, ctx) => {
  //There is no token
  if (!ctx.user) return false;

  //Incorrect auth for given address
  const address: string = ctx.user.address;
  const user = await db.selectFrom("auth").where("address", "=", address).selectAll().executeTakeFirst();
  if (user && user.access_token !== ctx.user.access_token) return false;

  //Valid token
  return new Date() < ctx.user.expireAt;
});

export const permissions = shield({
  Query: {
    "*": deny,
    me: isPublic,
  },
  Mutation: {
    "*": deny,
    login: isPublic,
    logout: isLoggedIn,
    refresh: isPublic,
    authenticationCode: isPublic,
  },
});
