import type { TypedEvent } from "../TypedEvents";
type TypedOnErrorEventHandlerNonNull<T> = (event: TypedEvent<T> | string, source?: string, lineno?: number, colno?: number, error?: Error) => unknown;
export type TypedOnErrorEventHandler<T> = TypedOnErrorEventHandlerNonNull<T> | null;
