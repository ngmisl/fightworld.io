import { db } from "~/db";
import { throwError } from "~/utilities";

export const getUser = async (address: string) => {
  const result = await db.selectFrom("auth").selectAll().where("address", "=", address).executeTakeFirst();
  return result ?? throwError(`user with address ${address} does not exist. This should not happen`);
};
