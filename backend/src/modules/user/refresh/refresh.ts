import { db } from "~/db";
import { generateTokens } from "~/utilities";

export const refresh = async (address: string, refreshToken: string) => {
  const user = await db.selectFrom("auth").where("address", "=", address).selectAll().executeTakeFirst();
  if (refreshToken === user?.refresh_token && refreshToken) {
    return generateTokens(user.address);
  }

  return null;
};
