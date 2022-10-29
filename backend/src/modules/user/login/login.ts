import { sign } from "jsonwebtoken";
import { enviroment } from "~/config/enviroment";
import { db } from "~/db";
import { verifyMessage } from "ethers/lib/utils";
import { throwError } from "~/utilities";
import { generateCode } from "~/utilities/generateCode";

export const authenticate = async (address: string, signature: string) => {
    const user = await db.selectFrom("auth").where("address", "=", address).selectAll().executeTakeFirst() ?? throwError("Authentication failed")
    const addressMatches = address == verifyMessage(user.code.toString(), signature);
    if(!addressMatches) throwError("Authentication failed");

    const access_token = sign({address}, enviroment.ACCESS_TOKEN_SECRET);
    const refresh_token = sign({address}, enviroment.ACCESS_TOKEN_SECRET);

    const result = await db.updateTable("auth").set({ code: generateCode(), refresh_token }).where("address", "=", address).executeTakeFirst();

    if(result.numUpdatedRows.toString() != "1") throwError("Authentication failed")

    return {
        access_token: access_token,
        refresh_token: refresh_token
    }
}