import * as express from 'express';

import loginController from './controllers/login';
import profileController from './controllers/profile';
import {simplePrivetController, simplePublicController} from '../../utils/ControllerBuilder';

const router = express.Router();

router.post('/login', simplePublicController(loginController));
router.get('/profile', simplePrivetController(profileController));

export default router;
