import {put, call, select} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {NoteEntityDto, EntityList} from 'template-common';

import {getNotesAction} from '../actions';
import {getNotesEndPoint} from '../endPoints';
import {tokenSelector} from '../../account/selectors';

export default function* getNotesSaga(action: ActionType<typeof getNotesAction.request>) {
  try {
    const token = yield select(tokenSelector);
    const notes: EntityList<NoteEntityDto> = yield call(getNotesEndPoint, action.payload, token);
    yield put(getNotesAction.success(notes));
  } catch (error) {
    yield put(getNotesAction.failure(error));
  }
}
