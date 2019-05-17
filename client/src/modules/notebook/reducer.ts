import {ActionType, createReducer, getType} from 'typesafe-actions';

import * as actions from './actions';
import initialState from './initialState';
import {Loading, setLoadError, setLoadProperty} from '../../types/LoadProperty';
import {Saving, setCreated, setDeleted, setError, setLoaded, setSaved} from '../../types/EditProperty';

type NotesActionType = ActionType<typeof actions>;

// const reducer = createReducer<typeof initialState, NotesActionType>(initialState)
//   .handleAction(actions.createNoteAction.success, (state, action) => ({
//     ...state,
//     createdNote: setLoadProperty(action.payload),
//   }));

const reducer = (state = initialState, action: NotesActionType) => {
  switch (action.type) {

    case getType(actions.getNotesAction.request):
      return {
        ...state,
        notes: Loading,
      };
    case getType(actions.getNotesAction.success):
      return {
        ...state,
        notes: setLoaded(action.payload),
      };
    case getType(actions.getNotesAction.failure):
      return {
        ...state,
        notes: setLoadError(action.payload),
      };

    // todo implement helper for async action and LoadProperty
    case getType(actions.createNoteAction.request):
      return {
        ...state,
        editNote: Saving,
      };
    case getType(actions.createNoteAction.success):
      return {
        ...state,
        editNote: setCreated(action.payload),
      };
    case getType(actions.createNoteAction.failure):
      return {
        ...state,
        editNote: setError(action.payload),
      };

    case getType(actions.updateNoteByIdAction.request):
      return {
        ...state,
        editNote: Saving,
      };
    case getType(actions.updateNoteByIdAction.success):
      return {
        ...state,
        editNote: setSaved(action.payload),
      };
    case getType(actions.updateNoteByIdAction.failure):
      return {
        ...state,
        editNote: setError(action.payload),
      };

    case getType(actions.deleteNoteByIdAction.request):
      return {
        ...state,
        editNote: Saving,
      };
    case getType(actions.deleteNoteByIdAction.success):
      return {
        ...state,
        editNote: setDeleted(action.payload),
      };
    case getType(actions.deleteNoteByIdAction.failure):
      return {
        ...state,
        editNote: setError(action.payload),
      };

    default:
      return state;
  }
};

export default reducer;
