import Id from './Id';

type Entity = Id & Readonly<{
  created: Date,
  updated: Date,
  deleted: boolean,
}>

export default Entity;
