import root from './root';
import account from './modules/account';
import RouterDescription from './types/RouterDescription';

export default [
  {
    path: '/',
    router: root,
  },
  {
    path: '/account',
    router: account,
  },
] as RouterDescription[];
