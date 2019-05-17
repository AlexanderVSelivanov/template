import {EntityList, UserEntityDto} from 'template-common';
import {LoadProperty, NotLoaded} from 'types/LoadProperty';
import {EditProperty, Empty} from '../../types/EditProperty';

export default {
  users: NotLoaded as LoadProperty<EntityList<UserEntityDto>>,
  editUser: Empty as EditProperty<UserEntityDto>,
};
