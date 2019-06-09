import Entity from './Entity';
import Disable from './Disable';
import {AccountEntityDto} from './Account';

type User = Readonly<Disable & {
  firstName: string
  lastName: string
  email: string
  account?: AccountEntityDto
}>

export type UserEntityDto = User & Entity;

export default User;
