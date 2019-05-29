import {put, call, select} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {NoteEntityDto} from 'template-common';

import {deleteNoteByIdAction} from '../actions';
import {deleteNoteByIdEndPoint} from '../endPoints';
import {tokenSelector} from '../../account/selectors';
import {AxiosResponse} from 'axios';

export default function* deleteNoteByIdSaga(action: ActionType<typeof deleteNoteByIdAction.request>) {
  try {
    const token = yield select(tokenSelector);
    const noteResponse: AxiosResponse<NoteEntityDto> = yield call(deleteNoteByIdEndPoint, action.payload, token);
    const note = noteResponse.data;
    yield put(deleteNoteByIdAction.success(note));
  } catch (error) {
    yield put(deleteNoteByIdAction.failure(error));
  }
}
