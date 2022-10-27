import { idArg, nonNull, objectType, queryField } from "nexus";
import { getUser } from "./queryUser";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.string("address");
  },
});

export const UserQuery = queryField((t) => {
  t.field("user", {
    type: User,
    args: {
      address: nonNull(idArg()),
    },
    resolve: (_, { address }) => getUser(address),
  });
});
