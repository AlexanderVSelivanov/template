import {RequestHandler} from 'express';

import userRepositoryFactory from '../../../store/repository/userRepository';
import {EntityList, EntityListRequest, NoteEntityDto} from 'template-common';

const getUsersController: RequestHandler = async (request, response, next) => {
  try {
    const entityListRequest: EntityListRequest = request.body;
    const userRepository = userRepositoryFactory();
    const users = await userRepository
      .createQueryBuilder()
      .skip(entityListRequest.skip)
      .take(entityListRequest.take)
      .execute();
    const count = await userRepository.count();
    const entityList: EntityList<NoteEntityDto> = {count, data: users};
    response.send(entityList);
  } catch (error) {
    next(error);
  }
};

export default getUsersController;
