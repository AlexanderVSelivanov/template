import Entity from '../types/Entity';
import Disable from '../types/Disable';
import UserDto from './UserDto';

type AccountDto = Readonly<Disable & {
  entity?: Entity,
  username: string
  password?: string
  user?: UserDto
}>

export default AccountDto;
