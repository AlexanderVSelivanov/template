import * as express from 'express';

import authorizationMiddleware from '../../services/serverService/authorizationMiddleware';

import getNotesController from './cotrollers/getNotes';
import putNoteController from './cotrollers/putNote';
import getNoteByIdController from './cotrollers/getNoteById';
import postNoteByIdController from './cotrollers/postNoteById';
import deleteNoteByIdController from './cotrollers/deleteNoteById';

const router = express.Router();

router.get('/', authorizationMiddleware(), getNotesController);
router.put('/', authorizationMiddleware(), putNoteController);
router.get('/:id', authorizationMiddleware(), getNoteByIdController);
router.post('/:id', authorizationMiddleware(), postNoteByIdController);
router.delete('/:id', authorizationMiddleware(), deleteNoteByIdController);

export default router;
