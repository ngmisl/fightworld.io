import { idArg, nonNull, objectType, queryField, stringArg } from "nexus";
import { authenticate } from "./login";

export const Tokens = objectType({
    name: "Tokens",
    definition(t) {
      t.nonNull.string("access_token");
    },
  });
  
  export const LoginQuery = queryField((t) => {
    t.field("login", {
      type: Tokens,
      args: {
        address: nonNull(idArg()),
        signature: nonNull(stringArg())
      },
      resolve: async (_, { address, signature }, ctx) => {
        const {access_token, refresh_token} = await authenticate(address, signature)
        ctx.response.cookie("refresh_token", refresh_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 1000 * 60 * 60 * 24 * 2, // 2 days
        })
        return {
          access_token
        }
      },
    });
  });