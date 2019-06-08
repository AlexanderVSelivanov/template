import {getEndPoint, patchEndPoint, postEndPoint, putEndPoint} from 'services/endPointService';

import {IdDto, UserDto, UserEntityDto, EntityList, UserListRequest} from 'template-common';

const prefix = '/user';

export const getUsersEndPoint = getEndPoint<UserListRequest, EntityList<UserEntityDto>>(`${prefix}`);
export const getUserByIdEndPoint = getEndPoint<IdDto, UserEntityDto>(`${prefix}/{id}`);
export const createUserEndPoint = postEndPoint<UserDto, UserEntityDto>(`${prefix}`);
export const updateUserByIdEndPoint = putEndPoint<UserDto, UserEntityDto>(`${prefix}/{id}`);
export const activateUserByIdEndPoint = patchEndPoint<IdDto, UserEntityDto>(`${prefix}/activate/{id}`);
export const disableUserByIdEndPoint = patchEndPoint<IdDto, UserEntityDto>(`${prefix}/disable/{id}`);
