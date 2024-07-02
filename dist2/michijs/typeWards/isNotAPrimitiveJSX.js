/**
 * @typedef {import('../types').ClassJSXElement} ClassJSXElement
 * @typedef {import('../types').DOMElementJSXElement} DOMElementJSXElement
 * @typedef {import('../types').FragmentJSXElement} FragmentJSXElement
 * @typedef {import('../types').FunctionJSXElement} FunctionJSXElement
 * @typedef {import('../types').ObjectJSXElement} ObjectJSXElement
 * @typedef {import('../types').ObservableNonNullablePrimitiveType} ObservableNonNullablePrimitiveType
 * @typedef {import('../types').SingleJSXElement} SingleJSXElement
 */

/**
 * @param {SingleJSXElement} jsx
 * @returns {jsx is | FunctionJSXElement | ClassJSXElement | ObjectJSXElement | FragmentJSXElement | DOMElementJSXElement | Node | ObservableNonNullablePrimitiveType}
 */
export function isNotAPrimitiveJSX(jsx) {
  return typeof jsx === "object";
}
