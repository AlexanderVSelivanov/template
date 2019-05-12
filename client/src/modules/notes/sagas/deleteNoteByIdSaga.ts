import {put, call} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {NoteEntityDto} from 'template-common';

import {deleteNoteByIdAction} from '../actions';
import {deleteNoteByIdEndPoint} from '../endPoints';

export default function* deleteNoteByIdSaga(action: ActionType<typeof deleteNoteByIdAction.request>) {
  try {
    const note: NoteEntityDto = yield call(deleteNoteByIdEndPoint, action.payload);
    yield put(deleteNoteByIdAction.success(note));
  } catch (error) {
    yield put(deleteNoteByIdAction.failure(error));
  }
}
