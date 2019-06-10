import {put, call, select} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {SuccessAsyncProperty, TokenDto, NoteDto, EntityList} from 'template-common';

import {getNotesAction} from '../actions';
import {getNotesEndPoint} from '../endPoints';
import {tokenSelector} from '../../account/selectors';
import {AxiosResponse} from 'axios';

export default function* getNotesSaga(action: ActionType<typeof getNotesAction.request>) {
  try {
    const token: SuccessAsyncProperty<TokenDto> = yield select(tokenSelector);
    const noteListResponse: AxiosResponse<EntityList<NoteDto>> =
      yield call(getNotesEndPoint, action.payload, token.value);
    const notes = noteListResponse.data;
    yield put(getNotesAction.success(notes));
  } catch (error) {
    yield put(getNotesAction.failure(error));
  }
}
