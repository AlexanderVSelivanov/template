import {getEndPoint, postEndPoint} from 'services/endPointService';

import {TokenDto, AccountEntityDto} from 'template-common';
import {LoginDto} from 'template-common';

const prefix = '/account';

export const loginEndPoint = postEndPoint<LoginDto, TokenDto>(`${prefix}/login`);
export const getAccountEndPoint = getEndPoint<null, AccountEntityDto>(`${prefix}`);
