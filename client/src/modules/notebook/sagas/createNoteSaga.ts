import {put, call, select} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {SuccessAsyncProperty, TokenDto, NoteDto} from 'template-common';
import {notifySuccess} from 'root/actions';
import {createNoteAction} from '../actions';
import {createNoteEndPoint} from '../endPoints';
import {tokenSelector} from '../../account/selectors';
import {AxiosResponse} from 'axios';

export default function* createNoteSaga(action: ActionType<typeof createNoteAction.request>) {
  try {
    const token: SuccessAsyncProperty<TokenDto> = yield select(tokenSelector);
    const noteResponse: AxiosResponse<NoteDto> = yield call(createNoteEndPoint, action.payload, token.value);
    const note = noteResponse.data;
    yield put(createNoteAction.success(note));
    yield put(notifySuccess('New note was created'));
  } catch (error) {
    yield put(createNoteAction.failure(error));
  }
}
