import { db } from "~/db";

export const getUser = async (address: string) => {
  const result = await db
    .selectFrom("user")
    .selectAll()
    .where("address", "=", address)
    .executeTakeFirst();
  return result ?? null;
};
