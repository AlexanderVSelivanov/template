import {EntityList, UserEntityDto} from 'template-common';
import {EditProperty, Empty} from '../../types/EditProperty';
import {AsyncProperty, EmptyProperty} from '../../types/AsyncProperty';

export default {
  users: EmptyProperty as AsyncProperty<EntityList<UserEntityDto>>,
  editUser: Empty as EditProperty<UserEntityDto>,
};
