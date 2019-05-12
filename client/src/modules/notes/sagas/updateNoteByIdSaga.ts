import {put, call} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {NoteEntityDto} from 'template-common';

import {updateNoteByIdAction} from '../actions';
import {updateNoteByIdEndPoint} from '../endPoints';

export default function* updateNoteByIdSaga(action: ActionType<typeof updateNoteByIdAction.request>) {
  try {
    const note: NoteEntityDto = yield call(updateNoteByIdEndPoint, action.payload);
    yield put(updateNoteByIdAction.success(note));
  } catch (error) {
    yield put(updateNoteByIdAction.failure(error));
  }
}
