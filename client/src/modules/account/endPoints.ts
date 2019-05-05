import {getEndPoint, postEndPoint} from 'src/services/endPointService';

import {Token, UserEntity} from 'template-common';
import {Login} from 'template-common';

const prefix = 'account';

export const loginEndPoint = postEndPoint<Login, Token>(`${prefix}/login`);
export const getAccountUserEndPoint = getEndPoint<null, UserEntity>(`${prefix}/profile`);

// todo move to user module
// export const getUserById = getEndPoint<Id, UserEntity>('account/{id}');
