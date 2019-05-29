import {put, call, select} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {NoteEntityDto} from 'template-common';

import {getNoteByIdAction} from '../actions';
import {getNoteByIdEndPoint} from '../endPoints';
import {tokenSelector} from '../../account/selectors';
import {AxiosResponse} from 'axios';

export default function* getNoteByIdSaga(action: ActionType<typeof getNoteByIdAction.request>) {
  try {
    const token = yield select(tokenSelector);
    const noteResponse: AxiosResponse<NoteEntityDto> = yield call(getNoteByIdEndPoint, action.payload, token);
    const note = noteResponse.data;
    yield put(getNoteByIdAction.success(note));
  } catch (error) {
    yield put(getNoteByIdAction.failure(error));
  }
}
