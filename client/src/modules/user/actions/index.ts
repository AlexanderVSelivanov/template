import {
  ApplicationError,
  IdDto,
  UserDto,
  UserEntityDto,
  EntityList,
  Id,
  UserListRequest,
} from 'template-common';

import {
  getUsersCreator,
  getUserByIdCreator,
  createUserCreator,
  updateUserByIdCreator,
  activateUserByIdCreator,
  disableUserByIdCreator,
  setUserEmptyCreator,
  setCreatedUserEmptyCreator,
  setUpdatedUserEmptyCreator,
  setActivatedUserEmptyCreator,
  setDisableUserEmptyCreator,
} from './types';

export const getUsersAction = getUsersCreator<UserListRequest, EntityList<UserEntityDto>, ApplicationError>();
export const getUserByIdAction = getUserByIdCreator<IdDto, UserEntityDto, ApplicationError>();
export const createUserAction = createUserCreator<UserDto, UserEntityDto, ApplicationError>();
export const updateUserByIdAction = updateUserByIdCreator<{ id: Id } & UserDto, UserEntityDto, ApplicationError>();
export const activateUserByIdAction = activateUserByIdCreator<IdDto, UserEntityDto, ApplicationError>();
export const disableUserByIdAction = disableUserByIdCreator<IdDto, UserEntityDto, ApplicationError>();
export const setUserEmptyAction = setUserEmptyCreator();
export const setCreatedUserEmptyAction = setCreatedUserEmptyCreator();
export const setUpdatedUserEmptyAction = setUpdatedUserEmptyCreator();
export const setActivatedUserEmptyAction = setActivatedUserEmptyCreator();
export const setDisableUserEmptyAction = setDisableUserEmptyCreator();
