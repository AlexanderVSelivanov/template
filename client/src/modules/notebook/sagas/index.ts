import {takeLatest, debounce} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {API_REQUEST_DEBOUNCE} from '../../../config';
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
  yield debounce(API_REQUEST_DEBOUNCE, getType(updateNoteByIdAction.request), updateNoteByIdSaga);
}
