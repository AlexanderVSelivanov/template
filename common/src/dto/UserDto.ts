import Entity from '../types/Entity';
import Disable from '../types/Disable';
import AccountDto from './AccountDto';

type UserDto = Readonly<Disable & {
  entity?: Entity,
  firstName: string
  lastName: string
  email: string
  account?: AccountDto
}>

export default UserDto;
