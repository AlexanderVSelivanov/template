import {put, call, select} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {NoteEntityDto} from 'template-common';

import {updateNoteByIdAction} from '../actions';
import {updateNoteByIdEndPoint} from '../endPoints';
import {tokenSelector} from '../../account/selectors';
import {AxiosResponse} from 'axios';

export default function* updateNoteByIdSaga(action: ActionType<typeof updateNoteByIdAction.request>) {
  try {
    const token = yield select(tokenSelector);
    const noteResponse: AxiosResponse<NoteEntityDto> = yield call(updateNoteByIdEndPoint, action.payload, token);
    const note = noteResponse.data;
    yield put(updateNoteByIdAction.success(note));
  } catch (error) {
    yield put(updateNoteByIdAction.failure(error));
  }
}
