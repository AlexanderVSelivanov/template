import {AsyncActionCreator, isActionOf, PayloadAction} from 'typesafe-actions';
import {
  ApplicationError,
  AsyncProperty,
  Empty,
  EmptyOr,
  setRequestProperty,
  setFailureProperty,
  setSuccessProperty,
} from 'template-common';

export default function handleAsyncProperty<T>(
  action: PayloadAction<string, any | T | ApplicationError>,
  asyncActionCreator: AsyncActionCreator<any, [string, T], [string, ApplicationError]>,
): EmptyOr<AsyncProperty<T>> {
  if (isActionOf(asyncActionCreator.request, action)) {
    return setRequestProperty();
  }
  if (isActionOf(asyncActionCreator.success, action)) {
    return setSuccessProperty((action as PayloadAction<string, T>).payload);
  }
  if (isActionOf(asyncActionCreator.failure, action)) {
    return setFailureProperty((action as PayloadAction<string, ApplicationError>).payload);
  }
  return Empty;
}
