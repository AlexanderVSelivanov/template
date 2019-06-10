import {UserDto} from 'template-common';
import entityToEntityDto from './entityToEntityDto';
import accountToAccountDto from './accountToAccountDto';
import UserEntity from '../../store/entities/UserEntity';

export default (entity: UserEntity, includeAccount: boolean = false): UserDto => ({
  entity: entityToEntityDto(entity),
  firstName: entity.firstName,
  lastName: entity.lastName,
  email: entity.email,
  disable: entity.disable,
  account: includeAccount && entity.account ? accountToAccountDto(entity.account) : undefined,
});
