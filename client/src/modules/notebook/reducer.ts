import {ActionType, createReducer, isActionOf} from 'typesafe-actions';
import {Empty, isEmpty, isSuccessProperty} from 'template-common';
import handleAsyncProperty from 'utils/handleAsyncProperty';
import * as actions from './actions';
import initialState from './initialState';

type NotebookActionType = ActionType<typeof actions>;
type NotebookStateType = typeof initialState;

const reducer = createReducer<NotebookStateType, NotebookActionType>(initialState)
  .handleAction(
    [
      actions.getNotesAction.request,
      actions.getNotesAction.success,
      actions.getNotesAction.failure,
    ], (state, action) => ({
      ...state,
      notes: handleAsyncProperty(action, actions.getNotesAction),
    }),
  )
  .handleAction(
    [
      actions.getNoteByIdAction.request,
      actions.getNoteByIdAction.success,
      actions.getNoteByIdAction.failure,
    ], (state, action) => {
      const notes = state.notes;
      if (
        isActionOf(actions.getNoteByIdAction.success, action)
        && !isEmpty(notes)
        && isSuccessProperty(notes)
        && notes.value.items.length > 0
      ) {
        const index = notes.value.items.findIndex(note => note.entity!.id === action.payload.entity!.id);
        notes.value.items[index] = action.payload;
      }
      return {
        ...state,
        note: handleAsyncProperty(action, actions.getNoteByIdAction),
        notes,
      };
    },
  )
  .handleAction(
    [
      actions.createNoteAction.request,
      actions.createNoteAction.success,
      actions.createNoteAction.failure,
    ], (state, action) => ({
      ...state,
      createdNote: handleAsyncProperty(action, actions.createNoteAction),
    }),
  )
  .handleAction(
    [
      actions.updateNoteByIdAction.request,
      actions.updateNoteByIdAction.success,
      actions.updateNoteByIdAction.failure,
    ], (state, action) => {
      const notes = state.notes;
      if (
        isActionOf(actions.updateNoteByIdAction.success, action)
        && !isEmpty(notes)
        && isSuccessProperty(notes)
        && notes.value.items.length > 0
      ) {
        const index = notes.value.items.findIndex(note => note.entity!.id === action.payload.entity!.id);
        notes.value.items[index] = action.payload;
      }
      return {
        ...state,
        updatedNote: handleAsyncProperty(action, actions.updateNoteByIdAction),
        notes,
      };
    },
  )
  .handleAction(
    [
      actions.deleteNoteByIdAction.request,
      actions.deleteNoteByIdAction.success,
      actions.deleteNoteByIdAction.failure,
    ], (state, action) => ({
      ...state,
      deletedNote: handleAsyncProperty(action, actions.deleteNoteByIdAction),
    }),
  )
  .handleAction(actions.setNoteEmptyAction, state => ({...state, note: Empty}))
  .handleAction(actions.setCreatedNoteEmptyAction, state => ({...state, createdNote: Empty}))
  .handleAction(actions.setUpdatedNoteEmptyAction, state => ({...state, updatedNote: Empty}))
  .handleAction(actions.setDeletedNoteEmptyAction, state => ({...state, deletedNote: Empty}));

export default reducer;
