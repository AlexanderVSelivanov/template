import {UserEntity, Token} from 'template-common';
import {Login} from 'template-common';

import {loginCreator, getAccountUserCreator} from './types';

export const loginAction = loginCreator<Login, Token, undefined>();
export const getAccountUserAction = getAccountUserCreator<void, UserEntity, undefined>();
