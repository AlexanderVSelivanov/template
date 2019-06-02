# template-server
Template for web API server written by TypeScript

## Setup, build, start, test

Configuration:</br>
```
yarn setup
```

Runs the app in the development mode:</br>
```
yarn start
```

Builds the app for production to the `build/production` folder:<br>
```
yarn build
```

Launches the test runner in the watch mode:</br>
```
yarn test
```

## Project structure
```
- /build                       - project builds
  - /build/database            - default database folder
  - /build/production          - production build folder  
- /config                      - typescript specific configuration files and environment file example
- /postman                     - export of the postman configuration  
- /src                         - application source code  
  - /modules                   - application modules
    - /moduleName              - module folder
      - /controllers           - module controllers
      - index.ts               - setup module and register module routes
  - /root                      - application root module
    - index.ts                 - setup root module
  - /services                  - application services
    - /serverService           - server service, middleware and low-level handlers
      - index.ts               - setup web server and modules routes
    - loggerService.ts         - logger service
  - /store                     - database orm configuration
    - /entities                - database entities  
    - /migrations              - database migrations and data initialization
      - initialize.ts          - database data initialize migration  
    - /repository              - entity repositories
    - DataBaseLogger.ts        - database logging
    - index.ts                 - config and create database connection
  - /types                     - application types
    - /mappers                 - entity to DTO mappers
    - RouterDescription.ts     - routes description type
  - /utils                     - application utilities
    - ControllerBuilder.ts     - controllers builder and helpers
      - simplePublicController - unauthorized simple controller helper
      - simplePrivetController - authorized simple controller helper
  - config.ts                  - application global configuration
  - index.ts                   - setup database connection and start web server
  - routers.ts                 - application modules routes
```

## Dependencies

## Code repository
