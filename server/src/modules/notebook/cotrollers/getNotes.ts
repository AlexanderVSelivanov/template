import noteRepositoryFactory from '../../../store/repository/noteRepository';
import {EntityListRequest, EntityList, NoteEntityDto} from 'template-common';
import {Controller, ok} from '../../../utils/ControllerBuilder';
import noteToNoteDto from '../../../types/mappers/noteToNoteDto';

const getNotesController: Controller<EntityListRequest, EntityList<NoteEntityDto>> = async ({input}) => {
  const noteRepository = noteRepositoryFactory();
  const [notes, count] = await noteRepository
    .findAndCount({skip: input.skip, take: input.take});
  const entityList: EntityList<NoteEntityDto> = {
    count,
    items: notes.map(note => noteToNoteDto(note)),
  };
  return ok(entityList);
};

export default getNotesController;
