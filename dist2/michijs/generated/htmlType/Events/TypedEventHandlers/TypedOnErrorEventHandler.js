/**
 * @typedef {import('../TypedEvents').TypedEvent} TypedEvent
 */

/**
 * @template T
 * @typedef {( event: TypedEvent<T> | string, source?: string, lineno?: number, colno?: number, error?: Error, ) => unknown} TypedOnErrorEventHandlerNonNull
 */

/**
 * @template T
 * @typedef {TypedOnErrorEventHandlerNonNull<T> | null} TypedOnErrorEventHandler
 */
