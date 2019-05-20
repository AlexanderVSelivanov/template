export enum AsyncPropertyState { Empty, Request, Success, Failure}

type EmptyAsyncProperty = { state: AsyncPropertyState.Empty };
export const EmptyProperty: EmptyAsyncProperty = {state: AsyncPropertyState.Empty};

type RequestAsyncProperty = { state: AsyncPropertyState.Request };
export const RequestProperty: RequestAsyncProperty = {state: AsyncPropertyState.Request};

type SuccessAsyncProperty<T> = { state: AsyncPropertyState.Success, data: T };
export const setSuccessProperty = <T>(data: T): SuccessAsyncProperty<T> => ({
  state: AsyncPropertyState.Success,
  data,
});
type FailureAsyncProperty = { state: AsyncPropertyState.Failure, error: Error };
export const setFailureProperty = (error: Error): FailureAsyncProperty => ({state: AsyncPropertyState.Failure, error});

export type AsyncProperty<T> =
  EmptyAsyncProperty | RequestAsyncProperty | SuccessAsyncProperty<T> | FailureAsyncProperty;

export const isEmpty =
  <T>(property: AsyncProperty<T>): property is EmptyAsyncProperty => property.state === AsyncPropertyState.Empty;
export const isRequest =
  <T>(property: AsyncProperty<T>): property is RequestAsyncProperty => property.state === AsyncPropertyState.Request;
export const isSuccess =
  <T>(property: AsyncProperty<T>): property is SuccessAsyncProperty<T> => property.state === AsyncPropertyState.Success;
export const isFailure =
  <T>(property: AsyncProperty<T>): property is FailureAsyncProperty => property.state === AsyncPropertyState.Failure;
