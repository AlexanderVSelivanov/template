import {EntityList, UserEntityDto, Empty, EmptyOr, AsyncProperty, EditAsyncProperty} from 'template-common';

export default {
  users: Empty as EmptyOr<AsyncProperty<EntityList<UserEntityDto>>>,
  editUser: Empty as EmptyOr<EditAsyncProperty<UserEntityDto>>,
};
