import Id from './Id';

type Entity = Id & Readonly<{
  created: Date,
  updated: Date,
}>

export default Entity;
