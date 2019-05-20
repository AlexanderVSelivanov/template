import Id from './Id';

type Entity = Id & Readonly<{
  created: Date,
  updated: Date,
  disable: boolean,
}>

export default Entity;
