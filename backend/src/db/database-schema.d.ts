export interface Auth {
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
