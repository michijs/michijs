/**
 * @typedef {import('./TypedUIEvent').TypedUIEvent} TypedUIEvent
 */

/**
 * @template T
 * @typedef {object} TypedInputEvent
 * @property {string | null} data
 * @property {DataTransfer | null} dataTransfer
 * @property {string} inputType
 * @property {boolean} isComposing
 * @property {() => StaticRange[]} getTargetRanges
 */
