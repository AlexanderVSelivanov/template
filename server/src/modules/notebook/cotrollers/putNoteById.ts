import {Id, NoteDto} from 'template-common';
import noteRepositoryFactory from '../../../store/repository/noteRepository';
import {badRequest, Controller, notFound, ok} from '../../../utils/ControllerBuilder';
import noteToNoteDto from '../../../types/mappers/noteToNoteDto';

const putNoteByIdController: Controller<NoteDto & { id: Id }, NoteDto> = async ({input}) => {
  if (input && input.id) {
    const noteRepository = noteRepositoryFactory();
    const note = await noteRepository.findOne(input.id);
    if (note) {
      const updatedNote = await noteRepository.save({...note, ...input, id: note.id});
      return ok(noteToNoteDto(updatedNote));
    }
    return notFound('Note entity not found');
  }
  return badRequest('Invalid note id');
};

export default putNoteByIdController;
