import { LoginQuery } from "./login/login.schema";
import { LogoutQuery } from "./logout/logout.schema";
import { MeQuery } from "./me/me.schema";
import { AuthenticationCodeQuery } from "./query-code/queryCode.schema";
import { RefreshQuery } from "./refresh/refresh.schema";

export * from "./me/me";

export const userTypes = { AuthenticationCodeQuery, LoginQuery, RefreshQuery, LogoutQuery, MeQuery };
