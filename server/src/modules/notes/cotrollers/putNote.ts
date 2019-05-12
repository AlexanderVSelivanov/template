import {RequestHandler} from 'express';

import noteRepositoryFactory from '../../../store/repository/noteRepository';
import {NoteDto, ResponseStatus} from 'template-common';
import NoteEntity from '../../../store/entities/NoteEntity';

const putNoteController: RequestHandler = async (request, response, next) => {
  try {
    if (request.account && request.account.user) {
      const user = request.account.user;
      const noteDto: NoteDto = request.body;
      const note = new NoteEntity();
      note.title = noteDto.title;
      note.text = noteDto.text;
      note.tags = noteDto.tags;
      note.user = user;
      const noteRepository = noteRepositoryFactory();
      const createNote = noteRepository.save(note);
      response.send(createNote);
    } else {
      response.sendStatus(ResponseStatus.InternalServerError);
    }
  } catch (error) {
    next(error);
  }
};

export default putNoteController;
