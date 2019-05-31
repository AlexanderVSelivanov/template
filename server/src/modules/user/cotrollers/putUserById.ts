import {Id, UserEntityDto, UserDto} from 'template-common';
import userRepositoryFactory from '../../../store/repository/userRepository';
import {badRequest, Controller, notFound, ok} from '../../../utils/ControllerBuilder';
import userToUserDto from '../../../types/mapper/userToUserDto';

const putUserByIdController: Controller<UserDto & { id: Id }, UserEntityDto> = async ({input}) => {
  if (input && input.id) {
    const userRepository = userRepositoryFactory();
    const user = await userRepository.findOne(input.id);
    if (user) {
      const updatedUser = await userRepository.save({...user, ...input, id: user.id});
      return ok(userToUserDto(updatedUser));
    }
    return notFound('User entity not found');
  }
  return badRequest('Invalid user id');
};

export default putUserByIdController;
