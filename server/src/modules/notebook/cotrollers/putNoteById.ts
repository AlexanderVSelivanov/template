
import {Id, NoteDto, NoteEntityDto} from 'template-common';
import noteRepositoryFactory from '../../../store/repository/noteRepository';
import {badRequest, Controller, notFound, ok} from '../../../utils/ControllerBuilder';
import noteToNoteDto from '../../../types/mapper/noteToNoteDto';

const putNoteByIdController: Controller<NoteDto, NoteEntityDto, { id: Id }> = async ({input, params}) => {
  if (params && params.id) {
    const noteRepository = noteRepositoryFactory();
    const note = await noteRepository.findOne(params.id);
    if (note) {
      const updatedNote = await noteRepository.save({...note, ...input});
      return ok(noteToNoteDto(updatedNote));
    }
    return notFound('Note entity not found');
  }
  return badRequest('Invalid note id');
};

export default putNoteByIdController;
