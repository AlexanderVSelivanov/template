import Entity from './Entity';
import Disable from './Disable';
import {UserEntityDto} from './User';

type Account = Readonly<Disable & {
  username: string
  password?: string
  user?: UserEntityDto
}>

export type AccountEntityDto = Account & Entity;

export default Account;
