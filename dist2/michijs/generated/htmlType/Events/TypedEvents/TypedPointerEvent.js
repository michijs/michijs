/**
 * @typedef {import('./TypedMouseEvent').TypedMouseEvent} TypedMouseEvent
 */

/**
 * @template T
 * @typedef {object} TypedPointerEvent
 * @property {number} height
 * @property {boolean} isPrimary
 * @property {number} pointerId
 * @property {"mouse" | "pen" | "touch"} pointerType
 * @property {number} pressure
 * @property {number} tangentialPressure
 * @property {number} tiltX
 * @property {number} tiltY
 * @property {number} twist
 * @property {number} width
 * @property {() => PointerEvent[]} getCoalescedEvents
 * @property {() => PointerEvent[]} getPredictedEvents
 */
