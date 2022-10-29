import { deny, rule, shield } from "graphql-shield";

const isPublic = rule()(() => true)

export const permissions = shield({
    Query: {
        "*": deny,
        authenticationCode: isPublic,
        login: isPublic,
    }
})