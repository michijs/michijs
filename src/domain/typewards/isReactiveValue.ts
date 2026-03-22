import { ReactiveValue } from "../entities/reactive/core/ReactiveValue";

export const isReactiveValue = <T>(val: unknown): val is ReactiveValue<T> => val instanceof ReactiveValue;
