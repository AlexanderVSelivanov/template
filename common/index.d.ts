export {Empty, isEmpty, EmptyProperty, EmptyOr} from './src/EmptyProperty';
export {
  AsyncProperty,
  RequestAsyncProperty,
  SuccessAsyncProperty,
  FailureAsyncProperty,
  setRequestProperty,
  isRequestProperty,
  setSuccessProperty,
  isSuccessProperty,
  setFailureProperty,
  isFailureProperty,
} from './src/AsyncProperty';

export {default as ApplicationError} from './src/ApplicationError';

export {default as Id} from './src/types/Id';
export {default as Entity} from './src/types/Entity';
export {default as Disable} from './src/types/Disable';
export {default as EntityListRequest} from './src/types/EntityListRequest';
export {default as EntityList} from './src/types/EntityList';

export {default as IdDto} from './src/dto/IdDto';
export {default as LoginDto} from './src/dto/LoginDto';
export {default as TokenDto} from './src/dto/TokenDto';
export {default as TokenPayloadDto} from './src/dto/TokenPayloadDto';
export {default as UserDto} from './src/dto/UserDto';
export {default as AccountDto} from './src/dto/AccountDto';
export {default as NoteDto} from './src/dto/NoteDto';

export {default as UserListRequest} from './src/requestData/UserListRequest';

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

export enum AsyncPropertyState { Request, Success, Failure}
