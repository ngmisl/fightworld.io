import { idArg, nonNull, objectType, queryField } from "nexus";
import { getCode } from "./queryCode";

export const AuthenticationCode = objectType({
  name: "AuthenticationCode",
  definition(t) {
    t.nonNull.int("code");
  },
});

export const AuthenticationCodeQuery = queryField((t) => {
  t.nonNull.field("authenticationCode", {
    type: AuthenticationCode,
    args: {
      address: nonNull(idArg()),
    },
    resolve: (_, { address }) => getCode(address),
  });
});
