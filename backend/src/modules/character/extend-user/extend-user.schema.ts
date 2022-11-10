import { extendType, objectType } from "nexus";
import { addressFromContext } from "~/utilities";
import { getUserCharacters } from "./extend-user";

export const Character = objectType({
  name: "Character",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.int("level");
  },
});

export const CharactersOnUser = extendType({
  type: "User",
  definition(t) {
    t.nonNull.list.nonNull.field("characters", {
      type: Character,
      resolve: async (_, __, ctx) => getUserCharacters(addressFromContext(ctx)),
    });
  },
});
