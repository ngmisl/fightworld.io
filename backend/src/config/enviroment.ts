//Create enviroment types here
import * as dotenv from "dotenv-flow";
import { throwError } from "~/utilities";
if(!process.env.NODE_ENV) throwError("Enviroment not set");
dotenv.config({ node_env: process.env.NODE_ENV});

export const enviroment = {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET ?? throwError("Token: ACCESS_TOKEN_SECRET not found"),
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET ?? throwError("Token: REFRESH_TOKEN_SECRET not found"),
}