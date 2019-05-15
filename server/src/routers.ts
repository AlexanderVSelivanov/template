import root from './root';
import account from './modules/account';
import users from './modules/user';
import notes from './modules/notebook';
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
  {
    path: '/user',
    router: users,
  },
  {
    path: '/notebook',
    router: notes,
  },
] as RouterDescription[];
