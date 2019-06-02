import {NoteEntityDto} from 'template-common';
import entityToEntityDto from './entityToEntityDto';
import NoteEntity from '../../store/entities/NoteEntity';

export default (entity: NoteEntity, includeText: boolean = false): NoteEntityDto => ({
  ...entityToEntityDto(entity),
  title: entity.title,
  tags: entity.tags,
  text: includeText ? entity.text : undefined,
});
