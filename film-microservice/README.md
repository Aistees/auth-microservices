# Film Microservice

Film management microservice for the cinema booking system.

## Installation

```bash
$ npm install
```

## Running the app

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

## Architecture

This microservice follows a clean architecture pattern with:
- **Domain**: Core business entities and interfaces (ports)
- **Application**: Use cases and commands
- **Infrastructure**: Data persistence implementations
- **Interfaces**: Controllers and DTOs

## API Endpoints

### Films
- `POST /films` - Create a new film
- `GET /films` - List all films
- `GET /films/:id` - Get film by ID
- `PUT /films/:id` - Update film
- `DELETE /films/:id` - Delete film
