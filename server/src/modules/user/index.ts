import * as express from 'express';

import profileController from './controllers/profile';

const router = express.Router();

router.get('/profile', profileController);

export default router;
