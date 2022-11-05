import { mutationField, objectType } from "nexus";
import { throwError } from "~/utilities";
import { logout } from "./logout";

  
export const LogoutResponse = objectType({
    name: "LogoutResponse",
    definition(t) {
        t.string("address");
    },
});

export const LogoutQuery = mutationField((t) => {
  t.field("logout", {
    type: LogoutResponse,
    resolve: async (_, __, ctx) => {
        const address = ctx.user?.address ?? throwError("Should not happen: Address should exist here")
        await logout(address)
        ctx.response.cookie("refresh_token", "invalid_refresh_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 0,
        })
        
        return {
            address: ctx.user?.address
        }
    },
  });
});