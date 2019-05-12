import {getEndPoint, postEndPoint} from 'services/endPointService';

import {TokenDto, UserEntityDto} from 'template-common';
import {LoginDto} from 'template-common';

const prefix = 'account';

export const loginEndPoint = postEndPoint<LoginDto, TokenDto>(`${prefix}/login`);
export const getAccountUserEndPoint = getEndPoint<null, UserEntityDto>(`${prefix}/profile`);
