export enum LoadPropertyState { NotLoaded, Loading, Loaded, Error}

type NotLoadedLoadProperty = { state: LoadPropertyState.NotLoaded };
export const NotLoaded: NotLoadedLoadProperty = {state: LoadPropertyState.NotLoaded};

type LoadingLoadProperty = { state: LoadPropertyState.Loading };
export const Loading: LoadingLoadProperty = {state: LoadPropertyState.Loading};

type LoadedLoadProperty<T> = { state: LoadPropertyState.Loaded, data: T };
export const setLoadingProperty = <T>(data: T): LoadedLoadProperty<T> => ({
  state: LoadPropertyState.Loaded,
  data,
});
type ErrorLoadProperty = { state: LoadPropertyState.Error, error: Error };
export const setLoadingError = (error: Error): ErrorLoadProperty => ({state: LoadPropertyState.Error, error});

export type LoadProperty<T> =
  NotLoadedLoadProperty | LoadingLoadProperty | LoadedLoadProperty<T> | ErrorLoadProperty;

export const isNotLoaded =
  <T>(property: LoadProperty<T>): property is NotLoadedLoadProperty => property.state === LoadPropertyState.NotLoaded;
export const isLoading =
  <T>(property: LoadProperty<T>): property is LoadingLoadProperty => property.state === LoadPropertyState.Loading;
export const isLoaded =
  <T>(property: LoadProperty<T>): property is LoadedLoadProperty<T> => property.state === LoadPropertyState.Loaded;
export const isError =
  <T>(property: LoadProperty<T>): property is ErrorLoadProperty => property.state === LoadPropertyState.Error;
