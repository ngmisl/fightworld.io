import { db } from "~/db";

export const getUser = async (address: string) => {
  const user = await db.selectFrom("auth").selectAll().where("address", "=", address).executeTakeFirstOrThrow();
  return user;
};
