import {put, call, select} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {SuccessAsyncProperty, TokenDto, NoteDto} from 'template-common';

import {updateNoteByIdAction} from '../actions';
import {updateNoteByIdEndPoint} from '../endPoints';
import {tokenSelector} from '../../account/selectors';
import {AxiosResponse} from 'axios';

export default function* updateNoteByIdSaga(action: ActionType<typeof updateNoteByIdAction.request>) {
  try {
    const token: SuccessAsyncProperty<TokenDto> = yield select(tokenSelector);
    const noteResponse: AxiosResponse<NoteDto> = yield call(updateNoteByIdEndPoint, action.payload, token.value);
    const note = noteResponse.data;
    yield put(updateNoteByIdAction.success(note));
  } catch (error) {
    yield put(updateNoteByIdAction.failure(error));
  }
}
