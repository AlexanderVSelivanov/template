import {EntityList, UserEntityDto} from 'template-common';
import LoadingProperty, {Empty} from 'types/LoadingProperty';

export default {
  users: Empty as LoadingProperty<EntityList<UserEntityDto>>,

  editUser: Empty as LoadingProperty<UserEntityDto>,
  createdUser: Empty as LoadingProperty<UserEntityDto>,
  deletedUser: Empty as LoadingProperty<UserEntityDto>,
};
