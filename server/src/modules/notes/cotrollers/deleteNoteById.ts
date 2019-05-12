import {RequestHandler} from 'express';

import {Id, ResponseStatus} from 'template-common';
import noteRepositoryFactory from '../../../store/repository/noteRepository';

const deleteNoteByIdController: RequestHandler = async (request, response, next) => {
  try {
    if (request.params.id) {
      const id: Id = request.params.id;
      const noteRepository = noteRepositoryFactory();
      const note = await noteRepository.findOne(id);
      if (note) {
        const removedNote = await noteRepository.remove(note);
        response.send(removedNote);
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

export default deleteNoteByIdController;
