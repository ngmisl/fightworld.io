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
    mutation Login($address: ID!, $signature: String!) {
  login(address: $address, signature: $signature) {
    access_token
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    address
  }
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RefreshDocument = gql`
    mutation Refresh($address: ID!) {
  refresh(address: $address) {
    access_token
  }
}
    `;

export function useRefreshMutation() {
  return Urql.useMutation<RefreshMutation, RefreshMutationVariables>(RefreshDocument);
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

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<Tokens>;
  logout?: Maybe<Yolo>;
  refresh?: Maybe<Tokens>;
};


export type MutationLoginArgs = {
  address: Scalars['ID'];
  signature: Scalars['String'];
};


export type MutationRefreshArgs = {
  address: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  authenticationCode: AuthenticationCode;
  user?: Maybe<User>;
};


export type QueryAuthenticationCodeArgs = {
  address: Scalars['ID'];
};


export type QueryUserArgs = {
  address: Scalars['ID'];
};

export type Tokens = {
  __typename?: 'Tokens';
  access_token?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  address: Scalars['String'];
};

export type Yolo = {
  __typename?: 'Yolo';
  address?: Maybe<Scalars['String']>;
};

export type AuthenticationCodeQueryVariables = Exact<{
  address: Scalars['ID'];
}>;


export type AuthenticationCodeQuery = { __typename?: 'Query', authenticationCode: { __typename?: 'AuthenticationCode', code: number } };

export type LoginMutationVariables = Exact<{
  address: Scalars['ID'];
  signature: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'Tokens', access_token?: string | null } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: { __typename?: 'Yolo', address?: string | null } | null };

export type RefreshMutationVariables = Exact<{
  address: Scalars['ID'];
}>;


export type RefreshMutation = { __typename?: 'Mutation', refresh?: { __typename?: 'Tokens', access_token?: string | null } | null };

import { IntrospectionQuery } from 'graphql';
export default {
  "__schema": {
    "queryType": {
      "name": "Query"
    },
    "mutationType": {
      "name": "Mutation"
    },
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
        "name": "Mutation",
        "fields": [
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
            "name": "logout",
            "type": {
              "kind": "OBJECT",
              "name": "Yolo",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "refresh",
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
              }
            ]
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
              "kind": "SCALAR",
              "name": "Any"
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
        "kind": "OBJECT",
        "name": "Yolo",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "SCALAR",
              "name": "Any"
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