import root from './root';
import account from './modules/account';
import users from './modules/users';
import notes from './modules/notes';
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
    path: '/users',
    router: users,
  },
  {
    path: '/notes',
    router: notes,
  },
] as RouterDescription[];
