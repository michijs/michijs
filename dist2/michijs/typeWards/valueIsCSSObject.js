/**
 * @typedef {import('../types').CSSObject} CSSObject
 * @typedef {import('../types').CSSProperty} CSSProperty
 */

/**
 * @param {CSSProperty} value
 * @returns {value is CSSObject}
 */
export function valueIsCSSObject(value) {
  return Boolean(
    value && typeof value === "object" && !value[Symbol.toPrimitive],
  );
  // When value is background: yourvariable
}
