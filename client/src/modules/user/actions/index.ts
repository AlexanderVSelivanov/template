import {ApplicationError, IdDto, UserDto, UserEntityDto, EntityListRequest, EntityList} from 'template-common';

import {
  getUsersCreator,
  getUserByIdCreator,
  createUserCreator,
  updateUserByIdCreator,
  deleteUserByIdCreator,
} from './types';

export const getUsersAction = getUsersCreator<EntityListRequest, EntityList<UserEntityDto>, ApplicationError>();
export const getUserByIdAction = getUserByIdCreator<IdDto, UserEntityDto, ApplicationError>();
export const createUserAction = createUserCreator<UserDto, UserEntityDto, ApplicationError>();
export const updateUserByIdAction = updateUserByIdCreator<UserDto, UserEntityDto, ApplicationError>();
export const deleteUserByIdAction = deleteUserByIdCreator<IdDto, UserEntityDto, ApplicationError>();
