import { providers } from "ethers";
import { createContext } from "react";

export interface AuthData {
  ethProvider: providers.Web3Provider;
  address?: string;
  code?: number;
  access_token?: string;
  signature?: string;
}
export interface Auth {
  auth: AuthData;
  setAuth: React.Dispatch<React.SetStateAction<AuthData>>;
}
export const AuthContext: React.Context<Auth | null> =
  createContext<Auth | null>(null);
