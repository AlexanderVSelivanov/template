import Entity from './Entity';

type User = Readonly<{
  login: string
  firstName: string
  lastName: string
}>

export type UserEntity = User & Entity;

export default User;
