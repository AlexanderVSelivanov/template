import {RequestHandler} from 'express';

import {UserEntity} from 'template-common';
import {authorizationDecorator} from '../../../services/serverService';

const profileController: RequestHandler = authorizationDecorator(null, (req, res) => {
  const user: UserEntity = {
    id: 1,
    created: new Date(),
    login: 'test',
    firstName: 'Test',
    lastName: 'Testovich',
    deleted: false,
  };

  res.json(user);
});

export default profileController;
