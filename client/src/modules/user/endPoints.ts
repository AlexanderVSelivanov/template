import {deleteEndPoint, getEndPoint, postEndPoint, putEndPoint} from 'services/endPointService';

import {IdDto, UserDto, UserEntityDto, EntityListRequest, EntityList} from 'template-common';

const prefix = 'user';

export const getUsersEndPoint = getEndPoint<EntityListRequest, EntityList<UserEntityDto>>(`${prefix}`);
export const getUserByIdEndPoint = getEndPoint<IdDto, UserEntityDto>(`${prefix}/{id}`);
export const createUserEndPoint = postEndPoint<UserDto, UserEntityDto>(`${prefix}`);
export const updateUserByIdEndPoint = putEndPoint<UserDto, UserEntityDto>(`${prefix}/{id}`);
export const deleteUserByIdEndPoint = deleteEndPoint<IdDto, UserEntityDto>(`${prefix}/{id}`);
