import {put, call, select} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {SuccessAsyncProperty, TokenDto, NoteEntityDto} from 'template-common';

import {getNoteByIdAction} from '../actions';
import {getNoteByIdEndPoint} from '../endPoints';
import {tokenSelector} from '../../account/selectors';
import {AxiosResponse} from 'axios';

export default function* getNoteByIdSaga(action: ActionType<typeof getNoteByIdAction.request>) {
  try {
    const token: SuccessAsyncProperty<TokenDto> = yield select(tokenSelector);
    const noteResponse: AxiosResponse<NoteEntityDto> = yield call(getNoteByIdEndPoint, action.payload, token.value);
    const note = noteResponse.data;
    yield put(getNoteByIdAction.success(note));
  } catch (error) {
    yield put(getNoteByIdAction.failure(error));
  }
}
