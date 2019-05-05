import Id from './Id';

type Entity = Readonly<{
  id: Id,
  created: Date
  deleted: boolean
}>

export default Entity;
