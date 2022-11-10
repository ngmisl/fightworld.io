import { db } from "~/db";
import { verifyMessage } from "ethers/lib/utils";
import { generateTokens } from "~/utilities";

export const authenticate = async (address: string, signature: string) => {
  const user = await db.selectFrom("auth").where("address", "=", address.toLowerCase()).selectAll().executeTakeFirst();
  if (!user) return null;
  const verifiedAddress = verifyMessage(user.code.toString(), signature);
  const addressMatches = address.toLowerCase() === verifiedAddress.toLowerCase();
  if (!addressMatches) return undefined;

  return generateTokens(user.address);
};
