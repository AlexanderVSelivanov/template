import * as express from 'express';
import {simplePrivetController} from '../../utils/ControllerBuilder';

import getNotesController from './cotrollers/getNotes';
import postNoteController from './cotrollers/postNote';
import getNoteByIdController from './cotrollers/getNoteById';
import putNoteByIdController from './cotrollers/putNoteById';
import deleteNoteByIdController from './cotrollers/deleteNoteById';

const router = express.Router();

router.get('/', simplePrivetController(getNotesController));
router.post('/', simplePrivetController(postNoteController));
router.get('/:id', simplePrivetController(getNoteByIdController));
router.put('/:id', simplePrivetController(putNoteByIdController));
router.delete('/:id', simplePrivetController(deleteNoteByIdController));

export default router;
