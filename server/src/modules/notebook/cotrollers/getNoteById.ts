import {Id, NoteEntityDto} from 'template-common';
import noteRepositoryFactory from '../../../store/repository/noteRepository';
import {badRequest, Controller, notFound, ok} from '../../../utils/ControllerBuilder';
import noteToNoteDto from '../../../types/mapper/noteToNoteDto';

const getNoteByIdController: Controller<{ id: Id }, NoteEntityDto> = async ({input}) => {
  if (input && input.id) {
    const noteRepository = noteRepositoryFactory();
    const note = await noteRepository.findOne(input.id);
    if (note) {
      return ok(noteToNoteDto(note, true));
    }
    return notFound('Note not found');
  }
  return badRequest('Invalid note id');
};

export default getNoteByIdController;
