import { objectType, queryField } from "nexus";
import { addressFromContext } from "~/utilities";
import { getUser } from "./me";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.string("address");
  },
});

export const MeQuery = queryField((t) => {
  t.field("me", {
    type: User,
    resolve: (_, __, ctx) => getUser(addressFromContext(ctx)),
  });
});
