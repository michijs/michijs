/**
 * @typedef {import('./TypedEvents/TypedClipboardEvent').TypedClipboardEvent} TypedClipboardEvent
 */

/**
 * @template T
 * @typedef {object} TypedDocumentAndElementEventHandlers
 * @property {(ev: TypedClipboardEvent<T>) => unknown} [oncopy]
 * @property {(ev: TypedClipboardEvent<T>) => unknown} [oncut]
 * @property {(ev: TypedClipboardEvent<T>) => unknown} [onpaste]
 */
