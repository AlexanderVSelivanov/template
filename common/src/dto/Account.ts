import Entity from './Entity';
import {UserEntityDto} from './User';

type Account = Readonly<{
  username: string
  password?: string
  user?: UserEntityDto
}>

export type AccountEntityDto = Account & Entity;

export default Account;
