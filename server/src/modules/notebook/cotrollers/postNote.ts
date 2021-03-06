import noteRepositoryFactory from '../../../store/repository/noteRepository';
import {NoteDto} from 'template-common';
import NoteEntity from '../../../store/entities/NoteEntity';
import {Controller, internalServerError, ok} from '../../../utils/ControllerBuilder';
import noteToNoteDto from '../../../types/mappers/noteToNoteDto';

const postNoteController: Controller<NoteDto, NoteDto> = async ({input, account}) => {
  if (account && account.user) {
    const user = account.user;
    const note = new NoteEntity();
    note.title = input.title;
    note.text = input.text;
    note.tags = input.tags;
    note.user = user;
    const noteRepository = noteRepositoryFactory();
    const createNote = await noteRepository.save(note);
    return ok(noteToNoteDto(createNote));
  }
  return internalServerError();
};

export default postNoteController;
