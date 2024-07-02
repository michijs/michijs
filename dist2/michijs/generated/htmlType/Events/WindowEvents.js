/**
 * @typedef {import('./TypedEvents/TypedBeforeUnloadEvent').TypedBeforeUnloadEvent} TypedBeforeUnloadEvent
 */

/**
 * @typedef {import('./TypedEvents/TypedEvent').TypedEvent} TypedEvent
 */

/**
 * @typedef {import('./TypedEvents/TypedMessageEvent').TypedMessageEvent} TypedMessageEvent
 */

/**
 * @typedef {import('./TypedEvents/TypedPageTransitionEvent').TypedPageTransitionEvent} TypedPageTransitionEvent
 */

/**
 * @typedef {import('./TypedEvents/TypedPopStateEvent').TypedPopStateEvent} TypedPopStateEvent
 */

/**
 * @typedef {import('./TypedEvents/TypedPromiseRejectionEvent').TypedPromiseRejectionEvent} TypedPromiseRejectionEvent
 */

/**
 * @typedef {import('./TypedEvents/TypedStorageEvent').TypedStorageEvent} TypedStorageEvent
 */

/**
 * @template T
 * @typedef {object} WindowEvents
 * @property {(ev: TypedEvent<T>) => unknown} [onafterprint]
 * @property {(ev: TypedEvent<T>) => unknown} [onbeforeprint]
 * @property {(ev: TypedBeforeUnloadEvent<T>) => unknown} [onbeforeunload]
 * @property {(ev: TypedEvent<T>) => unknown} [ongamepadconnected]
 * @property {(ev: TypedEvent<T>) => unknown} [ongamepaddisconnected]
 * @property {(ev: TypedEvent<T>) => unknown} [onhashchange]
 * @property {(ev: TypedEvent<T>) => unknown} [onlanguagechange]
 * @property {(ev: TypedMessageEvent<T>) => unknown} [onmessage]
 * @property {(ev: TypedMessageEvent<T>) => unknown} [onmessageerror]
 * @property {(ev: TypedEvent<T>) => unknown} [onoffline]
 * @property {(ev: TypedEvent<T>) => unknown} [ononline]
 * @property {(ev: TypedPageTransitionEvent<T>) => unknown} [onpagehide]
 * @property {(ev: TypedPageTransitionEvent<T>) => unknown} [onpageshow]
 * @property {(ev: TypedPopStateEvent<T>) => unknown} [onpopstate]
 * @property {(ev: TypedPromiseRejectionEvent<T>) => unknown} [onrejectionhandled]
 * @property {(ev: TypedStorageEvent<T>) => unknown} [onstorage]
 * @property {(ev: TypedPromiseRejectionEvent<T>) => unknown} [onunhandledrejection]
 * @property {(ev: TypedEvent<T>) => unknown} [onunload]
 */
