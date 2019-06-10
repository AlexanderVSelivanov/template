import {
  ApplicationError,
  IdDto,
  UserDto,
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

export const getUsersAction = getUsersCreator<UserListRequest, EntityList<UserDto>, ApplicationError>();
export const getUserByIdAction = getUserByIdCreator<IdDto, UserDto, ApplicationError>();
export const createUserAction = createUserCreator<UserDto, UserDto, ApplicationError>();
export const updateUserByIdAction = updateUserByIdCreator<{ id: Id } & UserDto, UserDto, ApplicationError>();
export const activateUserByIdAction = activateUserByIdCreator<IdDto, UserDto, ApplicationError>();
export const disableUserByIdAction = disableUserByIdCreator<IdDto, UserDto, ApplicationError>();
export const setUserEmptyAction = setUserEmptyCreator();
export const setCreatedUserEmptyAction = setCreatedUserEmptyCreator();
export const setUpdatedUserEmptyAction = setUpdatedUserEmptyCreator();
export const setActivatedUserEmptyAction = setActivatedUserEmptyCreator();
export const setDisableUserEmptyAction = setDisableUserEmptyCreator();
