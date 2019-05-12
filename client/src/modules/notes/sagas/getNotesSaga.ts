import {put, call} from 'redux-saga/effects';
import {ActionType} from 'typesafe-actions';
import {NoteEntityDto, EntityList} from 'template-common';

import {getNotesAction} from '../actions';
import {getNotesEndPoint} from '../endPoints';

export default function* getNotesSaga(action: ActionType<typeof getNotesAction.request>) {
  try {
    const notes: EntityList<NoteEntityDto> = yield call(getNotesEndPoint, action.payload);
    yield put(getNotesAction.success(notes));
  } catch (error) {
    yield put(getNotesAction.failure(error));
  }
}
