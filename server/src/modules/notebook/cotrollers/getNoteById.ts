import {Id, NoteEntityDto} from 'template-common';
import noteRepositoryFactory from '../../../store/repository/noteRepository';
import {badRequest, Controller, notFound, ok} from '../../../utils/ControllerBuilder';
import noteToNoteDto from '../../../types/mapper/noteToNoteDto';

const getNoteByIdController: Controller<undefined, NoteEntityDto, { id: Id }> = async ({params}) => {
  if (params && params.id) {
    const noteRepository = noteRepositoryFactory();
    const note = await noteRepository.findOne(params.id);
    if (note) {
      return ok(noteToNoteDto(note));
    }
    return notFound('Note not found');
  }
  return badRequest('Invalid note id');
};

export default getNoteByIdController;
