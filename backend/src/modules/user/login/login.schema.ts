import { idArg, mutationField, nonNull, stringArg } from "nexus";
import { Tokens } from "../user.schema";
import { authenticate } from "./login";

  
export const LoginQuery = mutationField((t) => {
  t.field("login", {
    type: Tokens,
    args: {
      address: nonNull(idArg()),
      signature: nonNull(stringArg())
    },
    resolve: async (_, { address, signature }, ctx) => {
      console.log("login")
      const tokens = await authenticate(address, signature)
      if(!tokens) {
        ctx.response.cookie("refresh_token", "invalid_refresh_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 0,
        })

        return null
      }

      ctx.response.cookie("refresh_token", tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 2, // 2 days
      })
      return {
        access_token: tokens.access_token
      }
    },
  });
});