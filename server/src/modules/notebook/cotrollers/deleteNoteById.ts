import {Id, NoteEntityDto} from 'template-common';
import noteRepositoryFactory from '../../../store/repository/noteRepository';
import {Controller, notFound, ok, badRequest} from '../../../utils/ControllerBuilder';
import noteToNoteDto from '../../../types/mapper/noteToNoteDto';

const deleteNoteByIdController: Controller<undefined, NoteEntityDto, { id: Id }> = async ({params}) => {
  if (params && params.id) {
    const noteRepository = noteRepositoryFactory();
    const note = await noteRepository.findOne(params.id);
    if (note) {
      const removedNote = await noteRepository.remove(note);
      return ok(noteToNoteDto(removedNote));
    }
    return notFound('Note entity not found');
  }
  return badRequest('Invalid note id');
};

export default deleteNoteByIdController;
