import {Router} from 'express';

import root from './root';
import account from './modules/account';

export default [
  {
    path: '/',
    router: root,
  },
  {
    path: '/account',
    router: account,
  },
] as Array<{ path: string, router: Router }>;
