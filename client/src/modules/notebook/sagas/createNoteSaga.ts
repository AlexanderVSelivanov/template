import {put, call, select} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {NoteEntityDto} from 'template-common';

import {createNoteAction} from '../actions';
import {createNoteEndPoint} from '../endPoints';
import {tokenSelector} from '../../account/selectors';
import {AxiosResponse} from 'axios';

export default function* createNoteSaga(action: ActionType<typeof createNoteAction.request>) {
  try {
    const token = yield select(tokenSelector);
    const noteResponse: AxiosResponse<NoteEntityDto> = yield call(createNoteEndPoint, action.payload, token);
    const note = noteResponse.data;
    yield put(createNoteAction.success(note));
  } catch (error) {
    yield put(createNoteAction.failure(error));
  }
}
