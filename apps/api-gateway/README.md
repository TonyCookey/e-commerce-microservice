# API Gateway

## Description

This handles all incomimng requests from the Client (Web/Mobile) and then routes to the appropiate microservice

### Connected MicroService

The API Gateway is connected to the user service, It routes all user-baed request(User Profile/Authentication) to the user Service

### Rate Limiting

Rate limiting is implemeted on the Gateway to protect from brute-force attacks

## Installation

```bash
$ npm install
```

## Running the app

The API Gateway is the root app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
