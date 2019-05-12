import * as express from 'express';

import authorizationMiddleware from '../../services/serverService/authorizationMiddleware';

import getUsersController from './cotrollers/getUsers';
import putUserController from './cotrollers/putUser';
import getUserByIdController from './cotrollers/getUserById';
import postUserByIdController from './cotrollers/postUserById';
import deleteUserByIdController from './cotrollers/deleteUserById';

const router = express.Router();

router.get('/', authorizationMiddleware(), getUsersController);
router.put('/', authorizationMiddleware(), putUserController);
router.get('/:id', authorizationMiddleware(), getUserByIdController);
router.post('/:id', authorizationMiddleware(), postUserByIdController);
router.delete('/:id', authorizationMiddleware(), deleteUserByIdController);

export default router;
