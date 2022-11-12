import { db } from "~/db";

export const logout = async (address: string) => {
  await db
    .updateTable("auth")
    .set({ refresh_token: null, access_token: null })
    .where("address", "=", address)
    .executeTakeFirstOrThrow();
};
