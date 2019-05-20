import {Id, UserEntityDto} from 'template-common';
import userRepositoryFactory from '../../../store/repository/userRepository';
import {badRequest, Controller, ok} from '../../../utils/ControllerBuilder';
import userToUserDto from '../../../types/mapper/userToUserDto';

const getUserByIdController: Controller<undefined, UserEntityDto, { id: Id }> = async ({params}) => {
  if (params && params.id) {
    const userRepository = userRepositoryFactory();
    const user = await userRepository.findOne(params.id);
    if (user) {
      return ok(userToUserDto(user));
    }
    return badRequest('User not found');
  }
  return badRequest('Invalid user id');
};

export default getUserByIdController;
