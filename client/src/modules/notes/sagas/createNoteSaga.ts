import {put, call} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {NoteEntityDto} from 'template-common';

import {createNoteAction} from '../actions';
import {createNoteEndPoint} from '../endPoints';

export default function* createNoteSaga(action: ActionType<typeof createNoteAction.request>) {
  try {
    const note: NoteEntityDto = yield call(createNoteEndPoint, action.payload);
    yield put(createNoteAction.success(note));
  } catch (error) {
    yield put(createNoteAction.failure(error));
  }
}
