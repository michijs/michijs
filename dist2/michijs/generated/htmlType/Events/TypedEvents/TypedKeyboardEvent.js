/**
 * @typedef {import('./TypedUIEvent').TypedUIEvent} TypedUIEvent
 */

/**
 * KeyboardEvent objects describe a user interaction with the keyboard; each event describes a single interaction between the user and a key (or combination of a key with modifier keys) on the keyboard.
 * @template T
 * @typedef {object} TypedKeyboardEvent
 * @property {boolean} altKey
 * @property {number} charCode
 * @property {string} code
 * @property {boolean} ctrlKey
 * @property {boolean} isComposing
 * @property {string} key
 * @property {number} keyCode
 * @property {number} location
 * @property {boolean} metaKey
 * @property {boolean} repeat
 * @property {boolean} shiftKey
 * @property {number} DOM_KEY_LOCATION_LEFT
 * @property {number} DOM_KEY_LOCATION_NUMPAD
 * @property {number} DOM_KEY_LOCATION_RIGHT
 * @property {number} DOM_KEY_LOCATION_STANDARD
 * @property {(keyArg: string) => boolean} getModifierState
 * @property {(typeArg: string, bubblesArg?: boolean, cancelableArg?: boolean, viewArg?: Window | null, keyArg?: string, locationArg?: number, ctrlKey?: boolean, altKey?: boolean, shiftKey?: boolean, metaKey?: boolean) => void} initKeyboardEvent
 */
