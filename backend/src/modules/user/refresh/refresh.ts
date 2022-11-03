import { sign } from "jsonwebtoken";
import { enviroment } from "~/config/enviroment";
import { db } from "~/db";
import { generateCode } from "~/utilities/generateCode";

export const refresh = async (address: string, refreshToken: string) => {
    const user = await db.selectFrom("auth").where("address", "=", address).selectAll().executeTakeFirst();
    if(refreshToken === user?.refresh_token && refreshToken) {
        const access_token = sign({address}, enviroment.ACCESS_TOKEN_SECRET, { expiresIn: 1000 * 60 * 10});
        const refresh_token = sign({address}, enviroment.ACCESS_TOKEN_SECRET, { expiresIn: "2d"});

        await db.updateTable("auth").set({ code: generateCode(), refresh_token }).where("address", "=", address).executeTakeFirst();

        return {
            access_token: access_token,
            refresh_token: refresh_token
        }
    }

    return undefined
}