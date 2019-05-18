import {Id, UserEntityDto} from 'template-common';
import userRepositoryFactory from '../../../store/repository/userRepository';
import {badRequest, Controller, notFound, ok} from '../../../utils/ControllerBuilder';
import userToUserDto from '../../../types/mapper/userToUserDto';

const deleteUserByIdController: Controller<undefined, UserEntityDto, { id: Id }> = async ({params}) => {
  if (params && params.id) {
    const userRepository = userRepositoryFactory();
    const user = await userRepository.findOne(params.id);
    if (user) {
      const updatedUser = await userRepository.save({...user, disable: true});
      return ok(userToUserDto(updatedUser));
    }
    return notFound('User entity not found');
  }
  return badRequest('Invalid user id');
};

export default deleteUserByIdController;
