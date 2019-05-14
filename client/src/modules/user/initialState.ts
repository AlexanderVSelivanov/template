import {EntityList, UserEntityDto} from 'template-common';
import {LoadingProperty, NotLoaded} from 'types/LoadingProperty';

export default {
  users: NotLoaded as LoadingProperty<EntityList<UserEntityDto>>,

  editUser: NotLoaded as LoadingProperty<UserEntityDto>,
  createdUser: NotLoaded as LoadingProperty<UserEntityDto>,
  deletedUser: NotLoaded as LoadingProperty<UserEntityDto>,
};
