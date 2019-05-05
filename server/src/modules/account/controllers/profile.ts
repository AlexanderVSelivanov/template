import * as express from 'express';

import {UserEntity} from 'template-common';

const profileController: express.RequestHandler = (req, res) => {
  const user: UserEntity = {
    id: 1,
    created: new Date(),
    login: 'test',
    firstName: 'Test',
    lastName: 'Testovich',
    deleted: false,
  };
  res.json(user);
};

export default profileController;
