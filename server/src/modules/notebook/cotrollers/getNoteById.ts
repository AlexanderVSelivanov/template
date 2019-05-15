import {RequestHandler} from 'express';

import {Id, ResponseStatus} from 'template-common';
import noteRepositoryFactory from '../../../store/repository/noteRepository';

const getNoteByIdController: RequestHandler = async (request, response, next) => {
  try {
    if (request.params.id) {
      const id: Id = request.params.id;
      const noteRepository = noteRepositoryFactory();
      const note = await noteRepository.findOne(id);
      response.send(note);
    } else {
      response.status(ResponseStatus.BadRequest).send('Invalid note id');
    }
  } catch (error) {
    next(error);
  }
};

export default getNoteByIdController;
