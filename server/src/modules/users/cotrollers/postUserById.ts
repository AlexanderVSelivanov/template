import {RequestHandler} from 'express';

import {Id, ResponseStatus, UserDto} from 'template-common';
import userRepositoryFactory from '../../../store/repository/userRepository';

const postUserByIdController: RequestHandler = async (request, response, next) => {
  try {
    if (request.params.id) {
      const id: Id = request.params.id;
      const userDto: UserDto = request.body;
      const userRepository = userRepositoryFactory();
      const user = await userRepository.findOne(id);
      if (user) {
        const updatedUser = await userRepository.save({...user, ...userDto});
        response.send(updatedUser);
      } else {
        response.status(ResponseStatus.NotFound).send('User entity not found');
      }
    } else {
      response.status(ResponseStatus.BadRequest).send('Invalid user id');
    }
  } catch (error) {
    next(error);
  }
};

export default postUserByIdController;
