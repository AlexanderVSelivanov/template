import {
  EntityList,
  UserEntityDto,
  Empty,
  EmptyOr,
  AsyncProperty,
} from 'template-common';

export default {
  users: Empty as EmptyOr<AsyncProperty<EntityList<UserEntityDto>>>,
  user: Empty as EmptyOr<AsyncProperty<UserEntityDto>>,
  createdUser: Empty as EmptyOr<AsyncProperty<UserEntityDto>>,
  updatedUser: Empty as EmptyOr<AsyncProperty<UserEntityDto>>,
  deletedUser: Empty as EmptyOr<AsyncProperty<UserEntityDto>>,
};
