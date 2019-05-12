import {RequestHandler} from 'express';

import {Id, NoteDto, ResponseStatus} from 'template-common';
import noteRepositoryFactory from '../../../store/repository/noteRepository';

const postNoteByIdController: RequestHandler = async (request, response, next) => {
  try {
    if (request.params.id) {
      const id: Id = request.params.id;
      const noteDto: NoteDto = request.body;
      const noteRepository = noteRepositoryFactory();
      const note = await noteRepository.findOne(id);
      if (note) {
        const updatedNote = await noteRepository.save({...note, ...noteDto});
        response.send(updatedNote);
      } else {
        response.status(ResponseStatus.NotFound).send('Note entity not found');
      }
    } else {
      response.status(ResponseStatus.BadRequest).send('Invalid note id');
    }
  } catch (error) {
    next(error);
  }
};

export default postNoteByIdController;
