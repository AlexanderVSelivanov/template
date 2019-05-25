export type EmptyProperty = undefined | null;
export type EmptyOr<T> = EmptyProperty | T;

export const isEmpty =
  (value: any): value is EmptyProperty => value === undefined || value === null;

export const Empty = undefined;
