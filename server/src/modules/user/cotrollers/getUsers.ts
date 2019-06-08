import userRepositoryFactory from '../../../store/repository/userRepository';
import {EntityList, UserEntityDto, UserListRequest} from 'template-common';
import {Controller, ok} from '../../../utils/ControllerBuilder';
import userToUserDto from '../../../types/mappers/userToUserDto';
import {Like} from 'typeorm';

const getUsersController: Controller<UserListRequest, EntityList<UserEntityDto>> =
  async ({input}) => {
    const userRepository = userRepositoryFactory();
    const [users, count] = await userRepository
      .findAndCount({
        skip: input.skip,
        take: input.take,
        where: input.search && [{
          firstName: Like(`%${input.search}%`),
        }, {
          lastName: Like(`%${input.search}%`),
        }, {
          email: Like(`%${input.search}%`),
        }],
      });
    const entityList: EntityList<UserEntityDto> = {
      count,
      items: users.map(user => userToUserDto(user)),
    };
    return ok(entityList);
  };

export default getUsersController;
