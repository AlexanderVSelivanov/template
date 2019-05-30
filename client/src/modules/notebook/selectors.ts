import {createSelector} from 'reselect';

import StateType from 'types/StateType';

const notebookState = (state: StateType) => state.notebook;

export const notesSelector = createSelector(notebookState, state => state.notes);
export const noteSelector = createSelector(notebookState, state => state.note);
export const createdNoteSelector = createSelector(notebookState, state => state.createdNote);
export const updatedNoteSelector = createSelector(notebookState, state => state.updatedNote);
export const deletedNoteSelector = createSelector(notebookState, state => state.deletedNote);
