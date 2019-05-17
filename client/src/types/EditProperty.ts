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

export type EmptyEditProperty = { state: EditPropertyState.Empty };
export const Empty: EditProperty<any> = {state: EditPropertyState.Empty};

export type LoadingEditProperty = { state: EditPropertyState.Loading };
export const Loading: EditProperty<any> = {state: EditPropertyState.Loading};

export type LoadedEditProperty<T> = { state: EditPropertyState.Loaded, data: T };
export const setLoaded = <T>(data: T): EditProperty<T> => ({
  data,
  state: EditPropertyState.Loaded,
});

export type SavingEditProperty = { state: EditPropertyState.Saving };
export const Saving: EditProperty<any> = {state: EditPropertyState.Saving};

export type ErrorEditProperty = { state: EditPropertyState.Error, error: Error };
export const setErrorEditProperty = (error: Error): EditProperty<any> => ({
  error,
  state: EditPropertyState.Error,
});

export type CreatedEditProperty<T> = { state: EditPropertyState.Created, data: T };
export const setCreated = <T>(data: T): EditProperty<T> => ({
  data,
  state: EditPropertyState.Created,
});

export type SavedEditProperty<T> = { state: EditPropertyState.Saved, data: T };
export const setSaved = <T>(data: T): EditProperty<T> => ({
  data,
  state: EditPropertyState.Saved,
});

export type DeletedEditProperty<T> = { state: EditPropertyState.Deleted, data: T };
export const setDeleted = <T>(data: T): EditProperty<T> => ({
  data,
  state: EditPropertyState.Deleted,
});

export type EditProperty<T> =
  | EmptyEditProperty
  | LoadingEditProperty
  | LoadedEditProperty<T>
  | SavingEditProperty
  | ErrorEditProperty
  | CreatedEditProperty<T>
  | SavedEditProperty<T>
  | DeletedEditProperty<T>;

export const isEmpty =
  <T>(property: EditProperty<T>): property is EmptyEditProperty => property.state === EditPropertyState.Empty;
export const isLoading =
  <T>(property: EditProperty<T>): property is LoadingEditProperty => property.state === EditPropertyState.Loading;
export const isLoaded =
  <T>(property: EditProperty<T>): property is LoadedEditProperty<T> => property.state === EditPropertyState.Loaded;
export const isSaving =
  <T>(property: EditProperty<T>): property is SavingEditProperty => property.state === EditPropertyState.Saving;
export const isError =
  <T>(property: EditProperty<T>): property is ErrorEditProperty => property.state === EditPropertyState.Error;
export const isCreated =
  <T>(property: EditProperty<T>): property is CreatedEditProperty<T> => property.state === EditPropertyState.Created;
export const isSaved =
  <T>(property: EditProperty<T>): property is SavedEditProperty<T> => property.state === EditPropertyState.Saved;
export const isDeleted =
  <T>(property: EditProperty<T>): property is DeletedEditProperty<T> => property.state === EditPropertyState.Deleted;
