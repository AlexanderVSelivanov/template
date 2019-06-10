import {getEndPoint, patchEndPoint, postEndPoint, putEndPoint} from 'services/endPointService';

import {IdDto, UserDto, EntityList, UserListRequest} from 'template-common';

const prefix = '/user';

export const getUsersEndPoint = getEndPoint<UserListRequest, EntityList<UserDto>>(`${prefix}`);
export const getUserByIdEndPoint = getEndPoint<IdDto, UserDto>(`${prefix}/{id}`);
export const createUserEndPoint = postEndPoint<UserDto, UserDto>(`${prefix}`);
export const updateUserByIdEndPoint = putEndPoint<UserDto, UserDto>(`${prefix}/{id}`);
export const activateUserByIdEndPoint = patchEndPoint<IdDto, UserDto>(`${prefix}/activate/{id}`);
export const disableUserByIdEndPoint = patchEndPoint<IdDto, UserDto>(`${prefix}/disable/{id}`);
