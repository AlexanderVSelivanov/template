import {EntityList, UserEntityDto} from 'template-common';
import {LoadProperty, NotLoaded} from 'types/LoadProperty';

export default {
  users: NotLoaded as LoadProperty<EntityList<UserEntityDto>>,

  editUser: NotLoaded as LoadProperty<UserEntityDto>,
  createdUser: NotLoaded as LoadProperty<UserEntityDto>,
  deletedUser: NotLoaded as LoadProperty<UserEntityDto>,
};
