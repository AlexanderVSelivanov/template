import {
  ActionType, createReducer, getType, Action,
  TypeConstant, AsyncActionCreator, isActionOf, PayloadAction,
} from 'typesafe-actions';
import {
  RequestProperty,
  setSuccessProperty,
  setFailureProperty,
  AsyncProperty,
  Empty,
  EmptyOr,
  ApplicationError,
  CreatingProperty,setCreatedProperty,setCreatingFailedProperty,
} from 'template-common';

import * as actions from './actions';
import initialState from './initialState';

type NotebookActionType = ActionType<typeof actions>;

function handleAsyncProperty<T>(
  action: PayloadAction<string, any | T | ApplicationError>,
  asyncActionCreator: AsyncActionCreator<any, [string, T], [string, ApplicationError]>,
): EmptyOr<AsyncProperty<T>> {
  if (isActionOf(asyncActionCreator.request, action)) {
    return RequestProperty;
  }
  if (isActionOf(asyncActionCreator.success, action)) {
    return setSuccessProperty((action as PayloadAction<string, T>).payload);
  }
  if (isActionOf(asyncActionCreator.failure, action)) {
    return setFailureProperty((action as PayloadAction<string, ApplicationError>).payload);
  }
  return Empty;
}

// function handleEditAsyncProperty<T>(
//   action: PayloadAction<string, any | T | ApplicationError>,
//   createAsyncActionCreator: AsyncActionCreator<any, [string, T], [string, ApplicationError]>,
//   getAsyncActionCreator: AsyncActionCreator<any, [string, T], [string, ApplicationError]>,
//   updateAsyncActionCreator: AsyncActionCreator<any, [string, T], [string, ApplicationError]>,
//   deleteAsyncActionCreator: AsyncActionCreator<any, [string, T], [string, ApplicationError]>,
// ): EmptyOr<AsyncProperty<T>> {
//   if (isActionOf(asyncActionCreator.request, action)) {
//     return RequestProperty;
//   }
//   if (isActionOf(asyncActionCreator.success, action)) {
//     return setSuccessProperty((action as PayloadAction<string, T>).payload);
//   }
//   if (isActionOf(asyncActionCreator.failure, action)) {
//     return setFailureProperty((action as PayloadAction<string, ApplicationError>).payload);
//   }
//
//
//
//   return Empty;
// }

const reducer = createReducer<typeof initialState, NotebookActionType>(initialState)
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
    actions.createNoteAction.request, state => ({
      ...state,
      editNote: CreatingProperty,
    }),
  )
  .handleAction(
    actions.createNoteAction.success, (state, action) => ({
      ...state,
      editNote: setCreatedProperty(action.payload),
    }),
  )
  .handleAction(
    actions.createNoteAction.failure, (state, action) => ({
      ...state,
      editNote: setCreatingFailedProperty(action.payload),
    }),
  );

// const reducer = (state = initialState, action: NotebookActionType) => {
//   test(action, actions.getNotesAction);
//   switch (action.type) {
//
//     // todo implement helper for async action and AsyncProperty
//     // case getType(actions.createNoteAction.request):
//     //   return {
//     //     ...state,
//     //     editNote: Saving,
//     //   };
//     // case getType(actions.createNoteAction.success):
//     //   return {
//     //     ...state,
//     //     editNote: setCreated(action.payload),
//     //   };
//     // case getType(actions.createNoteAction.failure):
//     //   return {
//     //     ...state,
//     //     editNote: setError(action.payload),
//     //   };
//     //
//     // case getType(actions.updateNoteByIdAction.request):
//     //   return {
//     //     ...state,
//     //     editNote: Saving,
//     //   };
//     // case getType(actions.updateNoteByIdAction.success):
//     //   return {
//     //     ...state,
//     //     editNote: setSaved(action.payload),
//     //   };
//     // case getType(actions.updateNoteByIdAction.failure):
//     //   return {
//     //     ...state,
//     //     editNote: setError(action.payload),
//     //   };
//     //
//     // case getType(actions.deleteNoteByIdAction.request):
//     //   return {
//     //     ...state,
//     //     editNote: Saving,
//     //   };
//     // case getType(actions.deleteNoteByIdAction.success):
//     //   return {
//     //     ...state,
//     //     editNote: setDeleted(action.payload),
//     //   };
//     // case getType(actions.deleteNoteByIdAction.failure):
//     //   return {
//     //     ...state,
//     //     editNote: setError(action.payload),
//     //   };
//
//     default:
//       return state;
//   }
// };

export default reducer;
