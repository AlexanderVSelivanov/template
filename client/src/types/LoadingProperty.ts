export enum LoadingPropertyState { NotLoaded, Loading, Loaded, Error}

type LoadingPropertyNotLoaded = { state: LoadingPropertyState.NotLoaded };
export const NotLoaded: LoadingPropertyNotLoaded = {state: LoadingPropertyState.NotLoaded};

type LoadingPropertyLoading = { state: LoadingPropertyState.Loading };
export const Loading: LoadingPropertyLoading = {state: LoadingPropertyState.Loading};

type LoadingPropertyLoaded<T> = { state: LoadingPropertyState.Loaded, data: T };
export const setLoadingProperty = <T>(data: T): LoadingPropertyLoaded<T> => ({
  state: LoadingPropertyState.Loaded,
  data,
});
type LoadingPropertyError = { state: LoadingPropertyState.Error, error: Error };
export const setLoadingError = (error: Error): LoadingPropertyError => ({state: LoadingPropertyState.Error, error});

export type LoadingProperty<T> =
  LoadingPropertyNotLoaded | LoadingPropertyLoading | LoadingPropertyLoaded<T> | LoadingPropertyError;
