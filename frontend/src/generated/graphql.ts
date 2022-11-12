import gql from "graphql-tag";
import * as Urql from "urql";

import { IntrospectionQuery } from "graphql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const CodeDocument = gql`
  mutation Code($address: ID!) {
    authenticationCode(address: $address) {
      code
    }
  }
`;

export function useCodeMutation() {
  return Urql.useMutation<CodeMutation, CodeMutationVariables>(CodeDocument);
}
export const LoginDocument = gql`
  mutation Login($address: ID!, $signature: String!) {
    login(address: $address, signature: $signature) {
      access_token
    }
  }
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout {
      address
    }
  }
`;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
}
export const MeDocument = gql`
  query Me {
    me {
      address
      characters {
        id
        level
      }
    }
  }
`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, "query">) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
}
export const RefreshDocument = gql`
  mutation Refresh($address: ID!) {
    refresh(address: $address) {
      access_token
    }
  }
`;

export function useRefreshMutation() {
  return Urql.useMutation<RefreshMutation, RefreshMutationVariables>(RefreshDocument);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthenticationCode = {
  __typename?: "AuthenticationCode";
  code: Scalars["Int"];
};

export type Character = {
  __typename?: "Character";
  id: Scalars["ID"];
  level: Scalars["Int"];
};

export type LogoutResponse = {
  __typename?: "LogoutResponse";
  address?: Maybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  authenticationCode: AuthenticationCode;
  login?: Maybe<Tokens>;
  logout?: Maybe<LogoutResponse>;
  refresh?: Maybe<Tokens>;
};

export type MutationAuthenticationCodeArgs = {
  address: Scalars["ID"];
};

export type MutationLoginArgs = {
  address: Scalars["ID"];
  signature: Scalars["String"];
};

export type MutationRefreshArgs = {
  address: Scalars["ID"];
};

export type Query = {
  __typename?: "Query";
  me?: Maybe<User>;
};

export type Tokens = {
  __typename?: "Tokens";
  access_token?: Maybe<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  address: Scalars["String"];
  characters: Array<Character>;
};

export type CodeMutationVariables = Exact<{
  address: Scalars["ID"];
}>;

export type CodeMutation = {
  __typename?: "Mutation";
  authenticationCode: { __typename?: "AuthenticationCode"; code: number };
};

export type LoginMutationVariables = Exact<{
  address: Scalars["ID"];
  signature: Scalars["String"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login?: { __typename?: "Tokens"; access_token?: string | null } | null;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = {
  __typename?: "Mutation";
  logout?: { __typename?: "LogoutResponse"; address?: string | null } | null;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?: {
    __typename?: "User";
    address: string;
    characters: Array<{ __typename?: "Character"; id: string; level: number }>;
  } | null;
};

export type RefreshMutationVariables = Exact<{
  address: Scalars["ID"];
}>;

export type RefreshMutation = {
  __typename?: "Mutation";
  refresh?: { __typename?: "Tokens"; access_token?: string | null } | null;
};
export default {
  __schema: {
    queryType: {
      name: "Query",
    },
    mutationType: {
      name: "Mutation",
    },
    subscriptionType: null,
    types: [
      {
        kind: "OBJECT",
        name: "AuthenticationCode",
        fields: [
          {
            name: "code",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "Character",
        fields: [
          {
            name: "id",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "level",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "LogoutResponse",
        fields: [
          {
            name: "address",
            type: {
              kind: "SCALAR",
              name: "Any",
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "Mutation",
        fields: [
          {
            name: "authenticationCode",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "AuthenticationCode",
                ofType: null,
              },
            },
            args: [
              {
                name: "address",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "login",
            type: {
              kind: "OBJECT",
              name: "Tokens",
              ofType: null,
            },
            args: [
              {
                name: "address",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
              {
                name: "signature",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "logout",
            type: {
              kind: "OBJECT",
              name: "LogoutResponse",
              ofType: null,
            },
            args: [],
          },
          {
            name: "refresh",
            type: {
              kind: "OBJECT",
              name: "Tokens",
              ofType: null,
            },
            args: [
              {
                name: "address",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "Query",
        fields: [
          {
            name: "me",
            type: {
              kind: "OBJECT",
              name: "User",
              ofType: null,
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "Tokens",
        fields: [
          {
            name: "access_token",
            type: {
              kind: "SCALAR",
              name: "Any",
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "User",
        fields: [
          {
            name: "address",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "characters",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "LIST",
                ofType: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "OBJECT",
                    name: "Character",
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: "SCALAR",
        name: "Any",
      },
    ],
    directives: [],
  },
} as unknown as IntrospectionQuery;
