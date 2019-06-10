import {
  EntityList,
  UserDto,
  Empty,
  EmptyOr,
  AsyncProperty,
} from 'template-common';

export default {
  users: Empty as EmptyOr<AsyncProperty<EntityList<UserDto>>>,
  user: Empty as EmptyOr<AsyncProperty<UserDto>>,
  createdUser: Empty as EmptyOr<AsyncProperty<UserDto>>,
  updatedUser: Empty as EmptyOr<AsyncProperty<UserDto>>,
  activatedUser: Empty as EmptyOr<AsyncProperty<UserDto>>,
  disabledUser: Empty as EmptyOr<AsyncProperty<UserDto>>,
};
