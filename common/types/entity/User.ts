import Entity from './Entity';

type User = Entity & Readonly<{
  firstName: string
  lastName: string
}>

export default User;
