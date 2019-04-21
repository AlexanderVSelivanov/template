import {Id, UserEntity} from 'template-common/entities';
import {ApplicationError, Login, Token} from 'template-common';

import {loginCreator, getUserCreator, getUserByIdCreator} from './types';

export const login = loginCreator<Login, Token, ApplicationError>();
export const getUser = getUserCreator<void, UserEntity, ApplicationError>();
export const getUserById = getUserByIdCreator<Id>();
