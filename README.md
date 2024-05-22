# nestjs-graphql-template 

## Description
- [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
- Graphql
- JWT

## Installation
```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

### QUERY Examples
- Create access token.
```graphql
mutation ($accessTokenInput: AccessTokenInput!){
 getAccessToken (accessTokenInput: $accessTokenInput){
   token
   message
  }
}
```

- Get current user information.
```graphql
query {
 user {
   username
   name
   serviceType
  }
}
```