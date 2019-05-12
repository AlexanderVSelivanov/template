import {takeLatest} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';

import {
  createNoteAction,
  deleteNoteByIdAction,
  getNoteByIdAction,
  getNotesAction,
  updateNoteByIdAction,
} from '../actions';

import createNoteSaga from './createNoteSaga';
import deleteNoteByIdSaga from './deleteNoteByIdSaga';
import getNoteByIdSaga from './getNoteByIdSaga';
import getNotesSaga from './getNotesSaga';
import updateNoteByIdSaga from './updateNoteByIdSaga';

export default function* accountSagas() {
  yield takeLatest(getType(createNoteAction.request), createNoteSaga);
  yield takeLatest(getType(deleteNoteByIdAction.request), deleteNoteByIdSaga);
  yield takeLatest(getType(getNoteByIdAction.request), getNoteByIdSaga);
  yield takeLatest(getType(getNotesAction.request), getNotesSaga);
  yield takeLatest(getType(updateNoteByIdAction.request), updateNoteByIdSaga);
}
