export {Empty, isEmpty, EmptyProperty, EmptyOr} from './src/EmptyProperty';
export {
  AsyncProperty,
  RequestAsyncProperty,
  SuccessAsyncProperty,
  FailureAsyncProperty,
  RequestProperty,
  isRequestProperty,
  setSuccessProperty,
  isSuccessProperty,
  setFailureProperty,
  isFailureProperty,
} from './src/AsyncProperty';

export {default as ApplicationError} from './src/ApplicationError';

export {default as Id} from './src/types/Id';
export {default as EntityListRequest} from './src/types/EntityListRequest';
export {default as EntityList} from './src/types/EntityList';

export {default as IdDto} from './src/dto/Id';
export {default as LoginDto} from './src/dto/Login';
export {default as TokenDto} from './src/dto/Token';
export {default as TokenPayloadDto} from './src/dto/TokenPayload';

export {default as EntityDto} from './src/dto/Entity';
export {default as DisableDto} from './src/dto/Disable';
export {default as UserDto, UserEntityDto} from './src/dto/User';
export {default as AccountDto, AccountEntityDto} from './src/dto/Account';
export {default as NoteDto, NoteEntityDto} from './src/dto/Note';

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

export enum EditPropertyType {Create, Update, Delete}
