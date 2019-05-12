import {put, call} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {NoteEntityDto} from 'template-common';

import {getNoteByIdAction} from '../actions';
import {getNoteByIdEndPoint} from '../endPoints';

export default function* getNoteByIdSaga(action: ActionType<typeof getNoteByIdAction.request>) {
  try {
    const note: NoteEntityDto = yield call(getNoteByIdEndPoint, action.payload);
    yield put(getNoteByIdAction.success(note));
  } catch (error) {
    yield put(getNoteByIdAction.failure(error));
  }
}
