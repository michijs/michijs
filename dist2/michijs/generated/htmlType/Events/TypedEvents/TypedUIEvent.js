/**
 * @typedef {import('./TypedEvent').TypedEvent} TypedEvent
 */

/**
 * Simple user interface events.
 * @template T
 * @typedef {object} TypedUIEvent
 * @property {number} detail
 * @property {Window | null} view
 * @property {number} which
 * @property {(typeArg: string, bubblesArg?: boolean, cancelableArg?: boolean, viewArg?: Window | null, detailArg?: number) => void} initUIEvent
 */
