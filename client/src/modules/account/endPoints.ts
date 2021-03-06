import {getEndPoint, postEndPoint} from 'services/endPointService';

import {TokenDto, AccountDto} from 'template-common';
import {LoginDto} from 'template-common';

const prefix = '/account';

export const loginEndPoint = postEndPoint<LoginDto, TokenDto>(`${prefix}/login`);
export const getAccountEndPoint = getEndPoint<null, AccountDto>(`${prefix}`);
