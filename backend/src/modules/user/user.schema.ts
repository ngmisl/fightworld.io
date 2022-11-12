import { objectType } from "nexus";

export const Tokens = objectType({
  name: "Tokens",
  definition(t) {
    t.string("access_token");
  },
});
