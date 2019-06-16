import {Equal} from 'typeorm';
import noteRepositoryFactory from '../../../store/repository/noteRepository';
import {EntityListRequest, EntityList, NoteDto} from 'template-common';
import {Controller, ok} from '../../../utils/ControllerBuilder';
import noteToNoteDto from '../../../types/mappers/noteToNoteDto';

const getNotesController: Controller<EntityListRequest, EntityList<NoteDto>> = async ({input, account}) => {
  const noteRepository = noteRepositoryFactory();
  const [notes, count] = await noteRepository
    .findAndCount({
      skip: input.skip,
      take: input.take,
      where: [{user: Equal(account!.user.id)}],
      order: {created: 'DESC'},
    });
  const entityList: EntityList<NoteDto> = {
    count,
    items: notes.map(note => noteToNoteDto(note)),
  };
  return ok(entityList);
};

export default getNotesController;
