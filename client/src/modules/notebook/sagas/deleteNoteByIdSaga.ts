import {put, call, select} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {NoteEntityDto} from 'template-common';

import {deleteNoteByIdAction} from '../actions';
import {deleteNoteByIdEndPoint} from '../endPoints';
import {tokenSelector} from '../../account/selectors';

export default function* deleteNoteByIdSaga(action: ActionType<typeof deleteNoteByIdAction.request>) {
  try {
    const token = yield select(tokenSelector);
    const note: NoteEntityDto = yield call(deleteNoteByIdEndPoint, action.payload, token);
    yield put(deleteNoteByIdAction.success(note));
  } catch (error) {
    yield put(deleteNoteByIdAction.failure(error));
  }
}
