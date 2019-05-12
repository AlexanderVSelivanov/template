import {createSelector} from 'reselect';

import StateType from 'types/StateType';

const notesState = (state: StateType) => state.notes;

export const notesSelector = createSelector(notesState, state => state.notes);

export const createdNoteSelector = createSelector(notesState, state => state.createdNote);
export const editNoteSelector = createSelector(notesState, state => state.editNote);
export const deletedNoteSelector = createSelector(notesState, state => state.deletedNote);

