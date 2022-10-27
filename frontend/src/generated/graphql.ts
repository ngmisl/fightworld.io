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
  user?: Maybe<User>;
};


export type QueryAuthenticationCodeArgs = {
  address: Scalars['ID'];
};


export type QueryUserArgs = {
  address: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  address: Scalars['String'];
};

export type AuthenticationCodeQueryVariables = Exact<{
  address: Scalars['ID'];
}>;


export type AuthenticationCodeQuery = { __typename?: 'Query', authenticationCode: { __typename?: 'AuthenticationCode', code: number } };

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