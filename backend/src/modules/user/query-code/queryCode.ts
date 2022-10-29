import { db } from "~/db";
import { generateCode } from "~/utilities/generateCode";
import { getUser } from "../query-user/queryUser";

export const getCode = async (address: string) => {
  const randomInteger = generateCode()
  const user = await getUser(address);
  if (user) {
     await db.updateTable("auth")
      .set({ code: randomInteger })
      .where("address", "=", address)
      .executeTakeFirstOrThrow();
  } else {
    await db.insertInto("user")
    .values({ address })
    .executeTakeFirstOrThrow();
    
    await db.insertInto("auth")
      .values({ code: randomInteger, address })
      .executeTakeFirstOrThrow();
  }

  return {
    code: randomInteger,
  };
};
