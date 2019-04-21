import {EndPointGet, EndPointPost} from 'src/utils/EndPoint';

import {Login, Token} from 'template-common/types';
import {Id, UserEntity} from 'template-common/entities';

export const login = EndPointPost<Login, Token>('login');
export const getUser = EndPointGet<void, UserEntity>('user');
export const getUserById = EndPointGet<Id, UserEntity>('user/{id}');
