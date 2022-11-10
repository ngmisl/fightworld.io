import { Context } from "~/context";
import { throwError } from "./throwError";

export const addressFromContext = (ctx: Context) => {
  const user = ctx.user ?? throwError("This should not happen. Make sure API blocks unautherized users");
  return user.address;
};
