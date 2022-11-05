import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { Request, Response } from "express"
import { verify } from "jsonwebtoken";
import { enviroment } from "./config/enviroment";

const getAddressFromToken = (request: ExpressContext) => {
  if(!request.req.headers.authorization) return null;
  const token = request.req.headers.authorization
  const decoded = verify(token, enviroment.ACCESS_TOKEN_SECRET) as { address: string, iat: number, exp: number }

  return {
    address: decoded.address,
    access_token: token,
    issuedAt: new Date(decoded.iat * 1000),
    expireAt: new Date(decoded.exp * 1000)
  }
}

export interface Context {
  request: Request,
  response: Response,
  user: {
    address: string,
    access_token: string,
    issuedAt: Date,
    expireAt: Date
  } | null
}

export async function createContext( request: ExpressContext) : Promise<Partial<Context>> {
  return {
    ...request,
    response: request.res,
    request: request.req,
    user: getAddressFromToken(request)
  }
}