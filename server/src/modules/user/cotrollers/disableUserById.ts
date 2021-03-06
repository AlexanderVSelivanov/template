import {Id, UserDto} from 'template-common';
import userRepositoryFactory from '../../../store/repository/userRepository';
import {badRequest, Controller, notFound, ok} from '../../../utils/ControllerBuilder';
import userToUserDto from '../../../types/mappers/userToUserDto';

const disableUserByIdController: Controller<{ id: Id }, UserDto> = async ({input}) => {
  if (input && input.id) {
    const userRepository = userRepositoryFactory();
    const user = await userRepository.findOne(input.id);
    if (user) {
      const updatedUser = await userRepository.save({...user, disable: true});
      return ok(userToUserDto(updatedUser));
    }
    return notFound('User entity not found');
  }
  return badRequest('Invalid user id');
};

export default disableUserByIdController;
