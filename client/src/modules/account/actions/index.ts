import {ApplicationError, LoginDto, TokenDto, AccountEntityDto} from 'template-common';

import {loginCreator, getAccountCreator, logoutCreator} from './types';

export const loginAction = loginCreator<LoginDto, TokenDto, ApplicationError>();
export const logoutAction = logoutCreator<void, void, ApplicationError>();
export const getAccountAction = getAccountCreator<void, AccountEntityDto, ApplicationError>();
