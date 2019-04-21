import Id from './Id';

type Entity = Id & Readonly<{
  created: Date
  deleted: boolean
}>

export default Entity;
