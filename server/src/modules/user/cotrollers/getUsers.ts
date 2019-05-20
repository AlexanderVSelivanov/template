import userRepositoryFactory from '../../../store/repository/userRepository';
import {EntityList, EntityListRequest, UserEntityDto} from 'template-common';
import {Controller, ok} from '../../../utils/ControllerBuilder';
import userToUserDto from '../../../types/mapper/userToUserDto';

const getUsersController: Controller<EntityListRequest, EntityList<UserEntityDto>> = async ({input}) => {
  const userRepository = userRepositoryFactory();
  const [users, count] = await userRepository
    .findAndCount({skip: input.skip, take: input.take});
  const entityList: EntityList<UserEntityDto> = {
      count,
      items: users.map(user => userToUserDto(user)),
    };
  return ok(entityList);
};

export default getUsersController;
