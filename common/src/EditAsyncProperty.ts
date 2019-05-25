import {
  isFailureProperty,
  isRequestProperty,
  isSuccessProperty,
  RequestProperty,
  setSuccessProperty,
  setFailureProperty, AsyncProperty,
} from './AsyncProperty';
import {Empty, isEmpty, EmptyOr} from './EmptyProperty';

export enum EditPropertyType {Create, Update, Delete}

export type CreateAsyncProperty<T> = {
  type: EditPropertyType.Create,
  value: EmptyOr<AsyncProperty<T>>,
};
export const CreateProperty: CreateAsyncProperty<any> = {type: EditPropertyType.Create, value: Empty};
export const isCreateProperty =
  <T>(property: EditAsyncProperty<T>): property is CreateAsyncProperty<T> => property.type === EditPropertyType.Create;
export const CreatingProperty: CreateAsyncProperty<any> = {type: EditPropertyType.Create, value: RequestProperty};
export const isCreatingProperty =
  <T>(property: EditAsyncProperty<T>): property is CreateAsyncProperty<T> =>
    isCreateProperty(property) && !isEmpty(property.value) && isRequestProperty(property.value);
export const setCreatedProperty = <T>(value: T): CreateAsyncProperty<T> => ({
  type: EditPropertyType.Create,
  value: setSuccessProperty(value),
});
export const isCreatedProperty =
  <T>(property: EditAsyncProperty<T>): property is CreateAsyncProperty<T> =>
    isCreateProperty(property) && !isEmpty(property.value) && isSuccessProperty(property.value);
export const setCreatingFailedProperty = (error: Error): CreateAsyncProperty<any> => ({
  type: EditPropertyType.Create,
  value: setFailureProperty(error),
});
export const isCreatingFailedProperty =
  <T>(property: EditAsyncProperty<T>): property is CreateAsyncProperty<T> =>
    isCreateProperty(property) && !isEmpty(property.value) && isFailureProperty(property.value);

export type UpdateAsyncProperty<T> = {
  type: EditPropertyType.Update,
  origin: EmptyOr<AsyncProperty<T>>,
  value: EmptyOr<AsyncProperty<T>>,
};
export const UpdateProperty: UpdateAsyncProperty<any> = {type: EditPropertyType.Update, origin: Empty, value: Empty};
export const isUpdateProperty =
  <T>(property: EditAsyncProperty<T>): property is UpdateAsyncProperty<T> => property.type === EditPropertyType.Update;
export const LoadingProperty: UpdateAsyncProperty<any> = {
  type: EditPropertyType.Update,
  origin: RequestProperty,
  value: Empty,
};
export const isLoadingProperty =
  <T>(property: EditAsyncProperty<T>): property is UpdateAsyncProperty<T> =>
    isUpdateProperty(property) && !isEmpty(property.origin) && isRequestProperty(property.origin);
export const setLoadedProperty = <T>(origin: T, value?: T): UpdateAsyncProperty<T> => ({
  type: EditPropertyType.Update,
  origin: setSuccessProperty(origin),
  value: value ? setSuccessProperty(value) : Empty,
});
export const isLoadedProperty =
  <T>(property: EditAsyncProperty<T>): property is UpdateAsyncProperty<T> =>
    isUpdateProperty(property) && !isEmpty(property.origin) && isSuccessProperty(property.origin);
export const setLoadingFailedProperty = <T>(error: Error, value?: T): UpdateAsyncProperty<T> => ({
  type: EditPropertyType.Update,
  origin: setFailureProperty(error),
  value: value ? setSuccessProperty(value) : Empty,
});
export const isLoadingFailedProperty =
  <T>(property: EditAsyncProperty<T>): property is UpdateAsyncProperty<T> =>
    isUpdateProperty(property) && !isEmpty(property.origin) && isFailureProperty(property.origin);
export const setSavingProperty = <T>(origin?: T): UpdateAsyncProperty<T> => ({
  type: EditPropertyType.Update,
  origin: origin ? setSuccessProperty(origin) : Empty,
  value: RequestProperty,
});
export const isSavingProperty =
  <T>(property: EditAsyncProperty<T>): property is UpdateAsyncProperty<T> =>
    isUpdateProperty(property) && !isEmpty(property.value) && isRequestProperty(property.value);
export const setSavedProperty = <T>(value: T, origin?: T): UpdateAsyncProperty<T> => ({
  type: EditPropertyType.Update,
  origin: origin ? setSuccessProperty(origin) : Empty,
  value: setSuccessProperty(value),
});
export const isSavedProperty =
  <T>(property: EditAsyncProperty<T>): property is UpdateAsyncProperty<T> =>
    isUpdateProperty(property) && !isEmpty(property.value) && isSuccessProperty(property.value);
export const setSavingFailedProperty = <T>(error: Error, origin?: T): UpdateAsyncProperty<T> => ({
  type: EditPropertyType.Update,
  origin: origin ? setSuccessProperty(origin) : Empty,
  value: setFailureProperty(error),
});
export const isSavingFailedProperty =
  <T>(property: EditAsyncProperty<T>): property is UpdateAsyncProperty<T> =>
    isUpdateProperty(property) && !isEmpty(property.value) && isFailureProperty(property.value);

export type DeleteAsyncProperty<T> = {
  type: EditPropertyType.Delete,
  value: EmptyOr<AsyncProperty<T>>,
};
export const DeleteProperty: DeleteAsyncProperty<any> = ({type: EditPropertyType.Delete, value: Empty});
export const isDeleteProperty =
  <T>(property: EditAsyncProperty<T>): property is DeleteAsyncProperty<T> => property.type === EditPropertyType.Delete;
export const DeletingProperty: DeleteAsyncProperty<any> = ({type: EditPropertyType.Delete, value: RequestProperty});
export const isDeletingProperty =
  <T>(property: EditAsyncProperty<T>): property is DeleteAsyncProperty<T> =>
    isDeleteProperty(property) && !isEmpty(property.value) && isRequestProperty(property.value);
export const setDeletedProperty = <T>(value: T): DeleteAsyncProperty<T> => ({
  type: EditPropertyType.Delete,
  value: setSuccessProperty(value),
});
export const isDeletedProperty =
  <T>(property: EditAsyncProperty<T>): property is DeleteAsyncProperty<T> =>
    isDeleteProperty(property) && !isEmpty(property.value) && isSuccessProperty(property.value);
export const setDeletingFailedProperty = (error: Error): DeleteAsyncProperty<any> => ({
  type: EditPropertyType.Delete,
  value: setFailureProperty(error),
});
export const isDeletingFailedProperty =
  <T>(property: EditAsyncProperty<T>): property is DeleteAsyncProperty<T> =>
    isDeleteProperty(property) && !isEmpty(property.value) && isFailureProperty(property.value);

export type EditAsyncProperty<T> = CreateAsyncProperty<T> | UpdateAsyncProperty<T> | DeleteAsyncProperty<T>;
