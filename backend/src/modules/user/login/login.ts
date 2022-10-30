import { sign } from "jsonwebtoken";
import { enviroment } from "~/config/enviroment";
import { db } from "~/db";
import { verifyMessage } from "ethers/lib/utils";
import { throwError } from "~/utilities";
import { generateCode } from "~/utilities/generateCode";

export const authenticate = async (address: string, signature: string) => {
    const user = await db.selectFrom("auth").where("address", "=", address).selectAll().executeTakeFirstOrThrow() ?? throwError("Authentication failed");
    const verifiedAddress = verifyMessage(user.code.toString(), signature);
    const addressMatches = address.toLowerCase() === verifiedAddress.toLowerCase();
    if(!addressMatches) throwError("Authentication failed");

    const access_token = sign({address}, enviroment.ACCESS_TOKEN_SECRET, { expiresIn: 1000 * 60 * 10});
    const refresh_token = sign({address}, enviroment.ACCESS_TOKEN_SECRET, { expiresIn: "2d"});

    await db.updateTable("auth").set({ code: generateCode(), refresh_token }).where("address", "=", address).executeTakeFirstOrThrow();

    return {
        access_token: access_token,
        refresh_token: refresh_token
    }
}