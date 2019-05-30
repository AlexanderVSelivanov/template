import {ActionType, createReducer, isActionOf} from 'typesafe-actions';
import {isEmpty, isSuccessProperty} from 'template-common';
import * as actions from './actions';
import initialState from './initialState';
import handleAsyncProperty from 'utils/handleAsyncProperty';

type NotebookActionType = ActionType<typeof actions>;
type NotebookStateType = typeof initialState;

const reducer = createReducer<NotebookStateType, NotebookActionType>(initialState)
  .handleAction(
    [
      actions.getNotesAction.request,
      actions.getNotesAction.success,
      actions.getNotesAction.failure,
    ], (state, action): NotebookStateType => ({
      ...state,
      notes: handleAsyncProperty(action, actions.getNotesAction),
    }),
  )
  .handleAction(
    [
      actions.getNoteByIdAction.request,
      actions.getNoteByIdAction.success,
      actions.getNoteByIdAction.failure,
    ], (state, action): NotebookStateType => {
      const notes = state.notes;
      if (
        isActionOf(actions.getNoteByIdAction.success, action)
        && !isEmpty(notes)
        && isSuccessProperty(notes)
        && notes.value.items.length > 0
      ) {
        const index = notes.value.items.findIndex(note => note.id === action.payload.id);
        notes.value.items[index] = action.payload;
      }
      return ({
        ...state,
        note: handleAsyncProperty(action, actions.getNoteByIdAction),
        notes,
      });
    },
  )
  .handleAction(
    [
      actions.createNoteAction.request,
      actions.createNoteAction.success,
      actions.createNoteAction.failure,
    ], (state, action): NotebookStateType => ({
      ...state,
      createdNote: handleAsyncProperty(action, actions.createNoteAction),
    }),
  )
  .handleAction(
    [
      actions.updateNoteByIdAction.request,
      actions.updateNoteByIdAction.success,
      actions.updateNoteByIdAction.failure,
    ], (state, action): NotebookStateType => ({
      ...state,
      updatedNote: handleAsyncProperty(action, actions.updateNoteByIdAction),
    }),
  )
  .handleAction(
    [
      actions.deleteNoteByIdAction.request,
      actions.deleteNoteByIdAction.success,
      actions.deleteNoteByIdAction.failure,
    ], (state, action): NotebookStateType => ({
      ...state,
      deletedNote: handleAsyncProperty(action, actions.deleteNoteByIdAction),
    }),
  );

export default reducer;
