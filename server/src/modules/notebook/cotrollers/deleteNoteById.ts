import {Id, NoteEntityDto} from 'template-common';
import noteRepositoryFactory from '../../../store/repository/noteRepository';
import {Controller, notFound, ok, badRequest} from '../../../utils/ControllerBuilder';
import noteToNoteDto from '../../../types/mappers/noteToNoteDto';

const deleteNoteByIdController: Controller<{ id: Id }, NoteEntityDto> = async ({input}) => {
  if (input && input.id) {
    const noteRepository = noteRepositoryFactory();
    const note = await noteRepository.findOne(input.id);
    if (note) {
      const removedNote = await noteRepository.remove(note);
      return ok(noteToNoteDto(removedNote));
    }
    return notFound('Note entity not found');
  }
  return badRequest('Invalid note id');
};

export default deleteNoteByIdController;
