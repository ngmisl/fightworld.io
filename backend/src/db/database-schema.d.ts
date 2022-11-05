export interface Auth {
  access_token: string | null;
  address: string;
  code: number;
  refresh_token: string | null;
}

export interface User {
  address: string;
}

export interface DB {
  auth: Auth;
  user: User;
}
