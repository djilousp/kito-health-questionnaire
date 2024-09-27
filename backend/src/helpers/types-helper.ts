import { Object } from 'ts-toolbelt';

type TakeNullableAndMakeThemOptional<T extends object> = Partial<
  Object.Select<T, null>
>;
type TakeDefaultableAndMakeThemOptional<
  T extends object,
  DEFAULTABLE_KEYS extends keyof T
> = Partial<Pick<T, DEFAULTABLE_KEYS>>;
type TakeNotNullableAndNotDefaultableAndKeepThem<
  T extends object,
  DEFAULTABLE_KEYS extends keyof T
> = Pick<
  T,
  Exclude<keyof T, DEFAULTABLE_KEYS | keyof TakeNullableAndMakeThemOptional<T>>
>;

export type InsertableDocument<
  DOCUMENT extends object,
  DEFAULTABLE_KEYS extends keyof DOCUMENT = never
> = TakeNullableAndMakeThemOptional<DOCUMENT> &
  TakeDefaultableAndMakeThemOptional<DOCUMENT, DEFAULTABLE_KEYS> &
  TakeNotNullableAndNotDefaultableAndKeepThem<DOCUMENT, DEFAULTABLE_KEYS>;

export type UpdatableDocument<DOCUMENT> = Partial<DOCUMENT>;
