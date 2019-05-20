import {Id, UserEntityDto, UserDto} from 'template-common';
import userRepositoryFactory from '../../../store/repository/userRepository';
import {badRequest, Controller, notFound, ok} from '../../../utils/ControllerBuilder';
import userToUserDto from '../../../types/mapper/userToUserDto';

const putUserByIdController: Controller<UserDto, UserEntityDto, { id: Id }> = async ({input, params}) => {
  if (params && params.id) {
    const userRepository = userRepositoryFactory();
    const user = await userRepository.findOne(params.id);
    if (user) {
      const updatedUser = await userRepository.save({...user, ...input});
      return ok(userToUserDto(updatedUser));
    }
    return notFound('User entity not found');
  }
  return badRequest('Invalid user id');
};

export default putUserByIdController;
