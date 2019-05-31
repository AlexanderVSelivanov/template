import {Id, UserEntityDto} from 'template-common';
import userRepositoryFactory from '../../../store/repository/userRepository';
import {badRequest, Controller, notFound, ok} from '../../../utils/ControllerBuilder';
import userToUserDto from '../../../types/mapper/userToUserDto';

const deleteUserByIdController: Controller<{ id: Id }, UserEntityDto> = async ({input}) => {
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

export default deleteUserByIdController;
