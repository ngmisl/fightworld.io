import { LoginQuery } from "./login/login.schema";
import { AuthenticationCodeQuery } from "./query-code/queryCode.schema";
import { UserQuery } from "./query-user/queryUser.schema";
import { RefreshQuery } from "./refresh/refresh.schema";

export const userTypes = { UserQuery, AuthenticationCodeQuery, LoginQuery, RefreshQuery };
