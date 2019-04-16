import {Router} from 'express';

import root from 'root';
import user from 'modules/user';

export default [
  {
    path: '/',
    router: root,
  },
  {
    path: '/user',
    router: user,
  },
] as Array<{ path: string, router: Router }>;
