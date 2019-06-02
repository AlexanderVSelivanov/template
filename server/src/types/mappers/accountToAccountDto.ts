import {AccountEntityDto} from 'template-common';
import entityToEntityDto from './entityToEntityDto';
import userToUserDto from './userToUserDto';
import AccountEntity from '../../store/entities/AccountEntity';

export default (entity: AccountEntity, includeUser: boolean = false): AccountEntityDto => ({
  ...entityToEntityDto(entity),
  username: entity.username,
  user: includeUser && entity.user ? userToUserDto(entity.user) : undefined,
});
