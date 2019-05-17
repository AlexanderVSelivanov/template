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
