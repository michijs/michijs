import type { WritableKeys } from "@shared";

export type PickWritable<E> = Pick<E, WritableKeys<E>>;
