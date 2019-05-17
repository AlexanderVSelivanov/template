import {createSelector} from 'reselect';

import StateType from 'types/StateType';

const notebookState = (state: StateType) => state.notebook;

export const notesSelector = createSelector(notebookState, state => state.notes);
export const editNoteSelector = createSelector(notebookState, state => state.editNote);
