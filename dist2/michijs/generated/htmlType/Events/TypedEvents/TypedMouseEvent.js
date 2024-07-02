/**
 * @typedef {import('./TypedUIEvent').TypedUIEvent} TypedUIEvent
 */

/**
 * @template T
 * @typedef {object} TypedMouseEvent
 * @property {boolean} altKey
 * @property {number} button
 * @property {number} buttons
 * @property {number} clientX
 * @property {number} clientY
 * @property {boolean} ctrlKey
 * @property {boolean} metaKey
 * @property {number} movementX
 * @property {number} movementY
 * @property {number} offsetX
 * @property {number} offsetY
 * @property {number} pageX
 * @property {number} pageY
 * @property {EventTarget | null} relatedTarget
 * @property {number} screenX
 * @property {number} screenY
 * @property {boolean} shiftKey
 * @property {number} x
 * @property {number} y
 * @property {(keyArg: string) => boolean} getModifierState
 * @property {(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, viewArg: Window, detailArg: number, screenXArg: number, screenYArg: number, clientXArg: number, clientYArg: number, ctrlKeyArg: boolean, altKeyArg: boolean, shiftKeyArg: boolean, metaKeyArg: boolean, buttonArg: number, relatedTargetArg: EventTarget | null) => void} initMouseEvent
 */
