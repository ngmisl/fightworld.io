import { idArg, mutationField, nonNull } from "nexus";
import { Tokens } from "../user.schema";
import { refresh } from "./refresh";
  
export const RefreshQuery = mutationField((t) => {
    t.field("refresh", {
        type: Tokens,
        args: {
        address: nonNull(idArg()),
        },
        resolve: async (_, { address }, ctx) => {
            const refreshToken = ctx.request.cookies['refresh_token'];
            const tokens = await refresh(address, refreshToken);
            if(!tokens) {
                ctx.response.cookie("refresh_token", "invalid_refresh_token", {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 0,
                })

                return {
                    access_token: null
                }
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