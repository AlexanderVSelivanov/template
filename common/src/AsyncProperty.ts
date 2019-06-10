export enum AsyncPropertyState { Request, Success, Failure}

type AsyncPropertyBase = { date: Date }

export type RequestAsyncProperty = AsyncPropertyBase & { state: AsyncPropertyState.Request };
export const setRequestProperty = (): RequestAsyncProperty => ({
  date: new Date(),
  state: AsyncPropertyState.Request,
});
export const isRequestProperty =
  <T>(property: AsyncProperty<T>): property is RequestAsyncProperty =>
    property.state === AsyncPropertyState.Request;

export type SuccessAsyncProperty<T> = AsyncPropertyBase & { state: AsyncPropertyState.Success, value: T };
export const setSuccessProperty = <T>(value: T): SuccessAsyncProperty<T> => ({
  date: new Date(),
  state: AsyncPropertyState.Success,
  value,
});
export const isSuccessProperty =
  <T>(property: AsyncProperty<T>): property is SuccessAsyncProperty<T> =>
    property.state === AsyncPropertyState.Success;

export type FailureAsyncProperty = AsyncPropertyBase & { state: AsyncPropertyState.Failure, error: Error };
export const setFailureProperty = (error: Error): FailureAsyncProperty => ({
  date: new Date(),
  state: AsyncPropertyState.Failure,
  error,
});
export const isFailureProperty =
  <T>(property: AsyncProperty<T>): property is FailureAsyncProperty =>
    property.state === AsyncPropertyState.Failure;

export type AsyncProperty<T> =
  RequestAsyncProperty | SuccessAsyncProperty<T> | FailureAsyncProperty;
