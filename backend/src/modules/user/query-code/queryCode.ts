import { db } from "~/db";
import { getUser } from "../query-user/queryUser";

export const getCode = async (address: string) => {
  const randomInteger = Math.floor(Math.random() * 100000);
  const user = await getUser(address);
  if (user) {
    db.updateTable("user")
      .set({ code: randomInteger })
      .where("address", "=", address)
      .executeTakeFirstOrThrow();
  } else {
    db.insertInto("user")
      .values({ code: randomInteger, address })
      .executeTakeFirstOrThrow();
  }
  return {
    code: randomInteger,
  };
};
