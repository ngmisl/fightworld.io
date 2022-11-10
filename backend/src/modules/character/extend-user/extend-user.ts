import { db } from "~/db";

export const getUserCharacters = async (address: string) => {
  const characters = await db.selectFrom("character").selectAll().where("address", "=", address).execute();
  return characters;
};
