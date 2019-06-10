import Id from './Id';

type Entity = Readonly<{
  id: Id,
  created: Date,
  updated: Date,
}>

export default Entity;
