import {ActionType, createReducer, getType} from 'typesafe-actions';

import * as actions from './actions';
import initialState from './initialState';
import {Loading, setLoadingError, setLoadingProperty} from '../../types/LoadProperty';

type NotesActionType = ActionType<typeof actions>;

// const reducer = createReducer<typeof initialState, NotesActionType>(initialState)
//   .handleAction(actions.createNoteAction.success, (state, action) => ({
//     ...state,
//     createdNote: setLoadingProperty(action.payload),
//   }));

const reducer = (state = initialState, action: NotesActionType) => {
  switch (action.type) {

    // todo implement helper for async action and LoadProperty
    case getType(actions.createNoteAction.request):
      return {
        ...state,
        createdNote: Loading,
      };
    case getType(actions.createNoteAction.success):
      return {
        ...state,
        createdNote: setLoadingProperty(action.payload),
      };
    case getType(actions.createNoteAction.failure):
      return {
        ...state,
        createdNote: setLoadingError(action.payload),
      };

    case getType(actions.updateNoteByIdAction.request):
      return {
        ...state,
        editNote: Loading,
      };
    case getType(actions.updateNoteByIdAction.success):
      return {
        ...state,
        editNote: setLoadingProperty(action.payload),
      };
    case getType(actions.updateNoteByIdAction.failure):
      return {
        ...state,
        editNote: setLoadingError(action.payload),
      };

    case getType(actions.deleteNoteByIdAction.request):
      return {
        ...state,
        deletedNote: Loading,
      };
    case getType(actions.deleteNoteByIdAction.success):
      return {
        ...state,
        deletedNote: setLoadingProperty(action.payload),
      };
    case getType(actions.deleteNoteByIdAction.failure):
      return {
        ...state,
        deletedNote: setLoadingError(action.payload),
      };

    default:
      return state;
  }
};

export default reducer;
