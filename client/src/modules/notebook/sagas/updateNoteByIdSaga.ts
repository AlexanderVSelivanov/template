import {put, call, select} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {NoteEntityDto} from 'template-common';

import {updateNoteByIdAction} from '../actions';
import {updateNoteByIdEndPoint} from '../endPoints';
import {tokenSelector} from '../../account/selectors';

export default function* updateNoteByIdSaga(action: ActionType<typeof updateNoteByIdAction.request>) {
  try {
    const token = yield select(tokenSelector);
    const note: NoteEntityDto = yield call(updateNoteByIdEndPoint, action.payload, token);
    yield put(updateNoteByIdAction.success(note));
  } catch (error) {
    yield put(updateNoteByIdAction.failure(error));
  }
}
