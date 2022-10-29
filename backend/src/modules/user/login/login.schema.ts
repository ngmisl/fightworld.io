import { idArg, nonNull, objectType, queryField, stringArg } from "nexus";
import { authenticate } from "./login";

export const Tokens = objectType({
    name: "Tokens",
    definition(t) {
      t.nonNull.string("access_token");
      t.nonNull.string("refresh_token");
    },
  });
  
  export const LoginQuery = queryField((t) => {
    t.field("login", {
      type: Tokens,
      args: {
        address: nonNull(idArg()),
        signature: nonNull(stringArg())
      },
      resolve: (_, { address, signature }) => authenticate(address, signature),
    });
  });