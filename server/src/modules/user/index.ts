import * as express from 'express';
import {simplePrivetController} from '../../utils/ControllerBuilder';

import getUsersController from './cotrollers/getUsers';
import postUserController from './cotrollers/postUser';
import getUserByIdController from './cotrollers/getUserById';
import putUserByIdController from './cotrollers/putUserById';
import disableUserById from './cotrollers/disableUserById';
import activateUserById from './cotrollers/activateUserById';

const router = express.Router();

router.get('/', simplePrivetController(getUsersController));
router.post('/', simplePrivetController(postUserController));
router.get('/:id', simplePrivetController(getUserByIdController));
router.put('/:id', simplePrivetController(putUserByIdController));
router.patch('/activate/:id', simplePrivetController(activateUserById));
router.patch('/disable/:id', simplePrivetController(disableUserById));

export default router;
