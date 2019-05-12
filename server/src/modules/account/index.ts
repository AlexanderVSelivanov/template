import * as express from 'express';

import authorizationMiddleware from '../../services/serverService/authorizationMiddleware';

import loginController from './controllers/login';
import profileController from './controllers/profile';

const router = express.Router();

router.post('/login', loginController);
router.get('/profile', authorizationMiddleware(), profileController);

export default router;
