export enum LoadingPropertyState { Empty, Loading, Loaded, Error}

type LoadingPropertyEmpty = { state: LoadingPropertyState.Empty };
export const Empty: LoadingPropertyEmpty = {state: LoadingPropertyState.Empty};

type LoadingPropertyLoading = { state: LoadingPropertyState.Loading };
export const Loading: LoadingPropertyLoading = {state: LoadingPropertyState.Loading};

type LoadingPropertyLoaded<T> = { state: LoadingPropertyState.Loaded, data: T };
export const setLoadingProperty = <T>(data: T): LoadingPropertyLoaded<T> => ({
  state: LoadingPropertyState.Loaded,
  data,
});
type LoadingPropertyError = { state: LoadingPropertyState.Error, error: Error };
export const setLoadingError = (error: Error): LoadingPropertyError => ({state: LoadingPropertyState.Error, error});

type LoadingProperty<T> =
  LoadingPropertyEmpty | LoadingPropertyLoading | LoadingPropertyLoaded<T> | LoadingPropertyError;

export default LoadingProperty;
