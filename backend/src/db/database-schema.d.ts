import { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Auth {
  access_token: string | null;
  address: string;
  code: number;
  refresh_token: string | null;
}

export interface Character {
  address: string;
  id: Generated<string>;
  level: number;
}

export interface User {
  address: string;
}

export interface DB {
  auth: Auth;
  character: Character;
  user: User;
}
