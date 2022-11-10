import { sign } from "jsonwebtoken";
import { enviroment } from "~/config/enviroment";
import { db } from "~/db";
import { generateCode } from "./generateCode";

export const generateTokens = async (address: string) => {
  const access_token = sign({ address }, enviroment.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 10 });
  const refresh_token = sign({ address }, enviroment.REFRESH_TOKEN_SECRET, { expiresIn: "2d" });

  await db
    .updateTable("auth")
    .set({ code: generateCode(), refresh_token, access_token })
    .where("address", "=", address)
    .executeTakeFirst();

  return {
    access_token: access_token,
    refresh_token: refresh_token,
  };
};
