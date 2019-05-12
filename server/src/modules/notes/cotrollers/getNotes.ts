import {RequestHandler} from 'express';

import noteRepositoryFactory from '../../../store/repository/noteRepository';
import {EntityListRequest, EntityList, NoteEntityDto} from 'template-common';

const getNotesController: RequestHandler = async (request, response, next) => {
  try {
    const entityListRequest: EntityListRequest = request.body;
    const noteRepository = noteRepositoryFactory();
    const notes = await noteRepository
      .createQueryBuilder()
      .select(['id', 'title', 'tags'])
      .skip(entityListRequest.skip)
      .take(entityListRequest.take)
      .execute();
    const count = await noteRepository.count();
    const entityList: EntityList<NoteEntityDto> = {count, data: notes};
    response.send(entityList);
  } catch (error) {
    next(error);
  }
};

export default getNotesController;
