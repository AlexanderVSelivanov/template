import * as express from 'express';

import loginController from './controllers/login';
import profileController from './controllers/profile';

const router = express.Router();

router.post('/login', loginController);
router.get('/profile', profileController);

export default router;
