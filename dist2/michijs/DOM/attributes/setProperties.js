import { setProperty } from "./setProperty";

/**
 * @typedef {import('../../types').AnyObject} AnyObject
 * @typedef {import('../../types').CreateOptions} CreateOptions
 */

/**
 * @param {Element} el
 * @param {AnyObject} attributes
 * @param {CreateOptions} [options]
 */
export function setProperties(el, attributes, options) {
    Object.entries(attributes).forEach(([name, newValue]) => setProperty(el, name, newValue, options));
}
