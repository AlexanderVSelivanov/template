import * as express from 'express';

import loginController from './controllers/login';
import accountController from './controllers/account';
import {simplePrivetController, simplePublicController} from '../../utils/ControllerBuilder';

const router = express.Router();

router.post('/login', simplePublicController(loginController));
router.get('/', simplePrivetController(accountController));

export default router;
