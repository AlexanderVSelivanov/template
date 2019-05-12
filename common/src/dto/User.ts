import Entity from './Entity';
import {AccountEntityDto} from './Account';

type User = Readonly<{
  firstName: string
  lastName: string
  email: string
  account?: AccountEntityDto
}>

export type UserEntityDto = User & Entity;

export default User;
