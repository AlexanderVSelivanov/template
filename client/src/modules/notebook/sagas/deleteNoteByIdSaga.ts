import {put, call, select} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {SuccessAsyncProperty, TokenDto, NoteDto} from 'template-common';

import {deleteNoteByIdAction} from '../actions';
import {deleteNoteByIdEndPoint} from '../endPoints';
import {tokenSelector} from '../../account/selectors';
import {AxiosResponse} from 'axios';
import {notifySuccess} from '../../../root/actions';

export default function* deleteNoteByIdSaga(action: ActionType<typeof deleteNoteByIdAction.request>) {
  try {
    const token: SuccessAsyncProperty<TokenDto> = yield select(tokenSelector);
    const noteResponse: AxiosResponse<NoteDto> = yield call(deleteNoteByIdEndPoint, action.payload, token.value);
    const note = noteResponse.data;
    yield put(deleteNoteByIdAction.success(note));
    yield put(notifySuccess(`Note was deleted (${note.title})`));
  } catch (error) {
    yield put(deleteNoteByIdAction.failure(error));
  }
}
