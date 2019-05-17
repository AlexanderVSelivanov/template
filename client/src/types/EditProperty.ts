export enum EditPropertyState {
  Empty,
  Loading,
  Loaded,
  Saving,
  Error,
  Created,
  Saved,
  Deleted,
}

export type EmptyEditProperty = { state: EditPropertyState.Empty; };
export const Empty: EditProperty<any> = {state: EditPropertyState.Empty};

export type LoadingEditProperty = { state: EditPropertyState.Loading; };
export const Loading: EditProperty<any> = {state: EditPropertyState.Loading};

export type LoadedEditProperty = { state: EditPropertyState.Loaded; };
export const Loaded: EditProperty<any> = {state: EditPropertyState.Loaded};

export type SavingEditProperty = { state: EditPropertyState.Saving; };
export const Saving: EditProperty<any> = {state: EditPropertyState.Saving};

export type ErrorEditProperty = { state: EditPropertyState.Error; error: Error; };
export const setErrorEditProperty = (error: Error): EditProperty<any> => ({
  error,
  state: EditPropertyState.Error,
});

export type CreatedEditProperty<T> = { state: EditPropertyState.Created; data: T; };
export const setCreated = <T>(data: T): EditProperty<T> => ({
  data,
  state: EditPropertyState.Created,
});

export type SavedEditProperty<T> = { state: EditPropertyState.Saved; data: T; };
export const setSaved = <T>(data: T): EditProperty<T> => ({
  data,
  state: EditPropertyState.Saved,
});

export type DeletedEditProperty<T> = { state: EditPropertyState.Deleted; data: T; };
export const setDeleted = <T>(data: T): EditProperty<T> => ({
  data,
  state: EditPropertyState.Deleted,
});

export type EditProperty<T> =
  | EmptyEditProperty
  | LoadingEditProperty
  | LoadedEditProperty
  | SavingEditProperty
  | ErrorEditProperty
  | CreatedEditProperty<T>
  | SavedEditProperty<T>
  | DeletedEditProperty<T>;
