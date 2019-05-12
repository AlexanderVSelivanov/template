import {RequestHandler} from 'express';

import {Id, ResponseStatus} from 'template-common';
import userRepositoryFactory from '../../../store/repository/userRepository';

const getUserByIdController: RequestHandler = async (request, response, next) => {
  try {
    if (request.params.id) {
      const id: Id = request.params.id;
      const userRepository = userRepositoryFactory();
      const user = await userRepository.findOne(id);
      response.send(user);
    } else {
      response.status(ResponseStatus.BadRequest).send('Invalid user id');
    }
  } catch (error) {
    next(error);
  }
};

export default getUserByIdController;
