import {Id, UserEntityDto} from 'template-common';
import userRepositoryFactory from '../../../store/repository/userRepository';
import {badRequest, Controller, ok} from '../../../utils/ControllerBuilder';
import userToUserDto from '../../../types/mappers/userToUserDto';

const getUserByIdController: Controller<{ id: Id }, UserEntityDto> = async ({input}) => {
  if (input && input.id) {
    const userRepository = userRepositoryFactory();
    const user = await userRepository.findOne(input.id, {relations: ['account']});
    if (user) {
      return ok(userToUserDto(user, true));
    }
    return badRequest('User not found');
  }
  return badRequest('Invalid user id');
};

export default getUserByIdController;
