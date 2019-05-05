export {default as ApplicationError} from './src/ApplicationError';

export {default as Login} from './src/api/Login';
export {default as Token} from './src/api/Token';
export {default as TokenPayload} from './src/api/TokenPayload';

export {default as Id} from './src/entities/Id';
export {default as Entity} from './src/entities/Entity';

export {default as User, UserEntity} from './src/entities/User';

export enum Environment {
  Production = 'production',
  Development = 'development',
}

export enum ResponseStatus {
  Ok = 200,
  Created = 201,
  NoContent = 204,
  MovedPermanently = 301,
  NotModified = 304,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  InternalServerError = 500,
  NotImplemented = 501,
}
