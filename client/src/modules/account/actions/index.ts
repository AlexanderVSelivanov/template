import {ApplicationError, LoginDto, TokenDto, UserEntityDto} from 'template-common';

import {loginCreator, getAccountUserCreator, logoutCreator} from './types';

export const loginAction = loginCreator<LoginDto, TokenDto, ApplicationError>();
export const logoutAction = logoutCreator<void, void, ApplicationError>();
export const getAccountUserAction = getAccountUserCreator<void, UserEntityDto, ApplicationError>();
