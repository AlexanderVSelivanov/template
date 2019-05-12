import {deleteEndPoint, getEndPoint, postEndPoint, putEndPoint} from 'services/endPointService';

import {IdDto, UserDto, UserEntityDto, EntityListRequest, EntityList} from 'template-common';

const prefix = 'user';

export const createUserEndPoint = putEndPoint<UserDto, UserEntityDto>(`${prefix}`);
export const deleteUserByIdEndPoint = deleteEndPoint<IdDto, UserEntityDto>(`${prefix}/{id}`);
export const getUserByIdEndPoint = getEndPoint<IdDto, UserEntityDto>(`${prefix}/{id}`);
export const getUsersEndPoint = getEndPoint<EntityListRequest, EntityList<UserEntityDto>>(`${prefix}`);
export const updateUserByIdEndPoint = postEndPoint<UserDto, UserEntityDto>(`${prefix}/{id}`);
