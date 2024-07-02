/**
 * @typedef {import('./TypedEvents/TypedEvent').TypedEvent} TypedEvent
 */

/**
 * @template T
 * @typedef {object} TypedElementEvent
 * @property {(ev: TypedEvent<T>) => unknown} [onfullscreenchange]
 * @property {(ev: TypedEvent<T>) => unknown} [onfullscreenerror]
 */
