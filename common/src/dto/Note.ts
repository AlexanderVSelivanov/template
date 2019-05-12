import Entity from './Entity';

type Note = Readonly<{
  title: string,
  text?: string,
  tags?: string[],
}>

export type NoteEntityDto = Note & Entity;

export default Note;
