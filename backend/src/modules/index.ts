import { characterTypes } from "./character";
import { userTypes } from "./user";

export const types = { ...userTypes, ...characterTypes } as const;
