import Id from 'src/types/entity/Id';
import User from 'src/types/entity/User';
import Token from 'src/root/types/Token';
import Login from 'src/root/types/Login';
import ApplicationError from 'src/types/ApplicationError';

import {loginCreator, getUserCreator, getUserByIdCreator} from './types';

export const login = loginCreator<Login, Token, ApplicationError>();
export const getUser = getUserCreator<void, User, ApplicationError>();
export const getUserById = getUserByIdCreator<Id>();
