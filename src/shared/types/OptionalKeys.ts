import type { RequiredKeys } from "@shared";

export type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>;