import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const AuthenticationCodeDocument = gql`
    query AuthenticationCode($address: ID!) {
  authenticationCode(address: $address) {
    code
  }
}
    `;

export function useAuthenticationCodeQuery(options: Omit<Urql.UseQueryArgs<AuthenticationCodeQueryVariables>, 'query'>) {
  return Urql.useQuery<AuthenticationCodeQuery, AuthenticationCodeQueryVariables>({ query: AuthenticationCodeDocument, ...options });
};
export const LoginDocument = gql`
    query Login($address: ID!, $signature: String!) {
  login(address: $address, signature: $signature) {
    access_token
    refresh_token
  }
}
    `;

export function useLoginQuery(options: Omit<Urql.UseQueryArgs<LoginQueryVariables>, 'query'>) {
  return Urql.useQuery<LoginQuery, LoginQueryVariables>({ query: LoginDocument, ...options });
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthenticationCode = {
  __typename?: 'AuthenticationCode';
  code: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  authenticationCode: AuthenticationCode;
  login?: Maybe<Tokens>;
  user?: Maybe<User>;
};


export type QueryAuthenticationCodeArgs = {
  address: Scalars['ID'];
};


export type QueryLoginArgs = {
  address: Scalars['ID'];
  signature: Scalars['String'];
};


export type QueryUserArgs = {
  address: Scalars['ID'];
};

export type Tokens = {
  __typename?: 'Tokens';
  access_token: Scalars['String'];
  refresh_token: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  address: Scalars['String'];
};

export type AuthenticationCodeQueryVariables = Exact<{
  address: Scalars['ID'];
}>;


export type AuthenticationCodeQuery = { __typename?: 'Query', authenticationCode: { __typename?: 'AuthenticationCode', code: number } };

export type LoginQueryVariables = Exact<{
  address: Scalars['ID'];
  signature: Scalars['String'];
}>;


export type LoginQuery = { __typename?: 'Query', login?: { __typename?: 'Tokens', access_token: string, refresh_token: string } | null };

import { IntrospectionQuery } from 'graphql';
export default {
  "__schema": {
    "queryType": {
      "name": "Query"
    },
    "mutationType": null,
    "subscriptionType": null,
    "types": [
      {
        "kind": "OBJECT",
        "name": "AuthenticationCode",
        "fields": [
          {
            "name": "code",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Query",
        "fields": [
          {
            "name": "authenticationCode",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AuthenticationCode",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "address",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "login",
            "type": {
              "kind": "OBJECT",
              "name": "Tokens",
              "ofType": null
            },
            "args": [
              {
                "name": "address",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              },
              {
                "name": "signature",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          },
          {
            "name": "user",
            "type": {
              "kind": "OBJECT",
              "name": "User",
              "ofType": null
            },
            "args": [
              {
                "name": "address",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Any"
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Tokens",
        "fields": [
          {
            "name": "access_token",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          },
          {
            "name": "refresh_token",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "User",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Any"
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Any"
      }
    ],
    "directives": []
  }
} as unknown as IntrospectionQuery;