import * as express from 'express';

const profileController: express.RequestHandler = (req, res) => {
  res.json({
    name: 'test',
    email: 'test@test.com',
  });
};

export default profileController;
