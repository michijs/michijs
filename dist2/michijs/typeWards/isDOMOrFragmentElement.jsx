/**
 * @typedef {import('../types').ClassJSXElement} ClassJSXElement
 * @typedef {import('../types').DOMElementJSXElement} DOMElementJSXElement
 * @typedef {import('../types').FragmentJSXElement} FragmentJSXElement
 * @typedef {import('../types').FunctionJSXElement} FunctionJSXElement
 * @typedef {import('../types').ObjectJSXElement} ObjectJSXElement
 */

/**
 * @param {| ObjectJSXElement | FunctionJSXElement | FragmentJSXElement | ClassJSXElement | DOMElementJSXElement} jsx
 * @returns {jsx is DOMElementJSXElement | FragmentJSXElement}
 */
export function isDOMOrFragmentElement(jsx) {
  return !jsx.jsxTag || typeof jsx.jsxTag === "object";
}
