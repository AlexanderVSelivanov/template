import Entity from '../types/Entity';

type NoteDto = Readonly<{
  entity?: Entity,
  title: string,
  text?: string,
  tags?: string[],
}>

export default NoteDto;
