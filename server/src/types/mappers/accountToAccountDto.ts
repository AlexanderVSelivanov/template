import {AccountDto} from 'template-common';
import entityToEntityDto from './entityToEntityDto';
import userToUserDto from './userToUserDto';
import AccountEntity from '../../store/entities/AccountEntity';

export default (entity: AccountEntity, includeUser: boolean = false): AccountDto => ({
  entity: entityToEntityDto(entity),
  username: entity.username,
  disable: entity.disable,
  user: includeUser && entity.user ? userToUserDto(entity.user) : undefined,
});
