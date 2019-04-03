import {Id, User} from 'template-common/entity';
import {ApplicationError, Login, Token} from 'template-common';

import {loginCreator, getUserCreator, getUserByIdCreator} from './types';

export const login = loginCreator<Login, Token, ApplicationError>();
export const getUser = getUserCreator<undefined, User, ApplicationError>();
export const getUserById = getUserByIdCreator<Id>();
