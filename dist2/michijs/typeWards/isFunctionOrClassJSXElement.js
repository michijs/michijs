/**
 * @typedef {import('../types').ClassJSXElement} ClassJSXElement
 * @typedef {import('../types').FunctionJSXElement} FunctionJSXElement
 * @typedef {import('../types').ObjectJSXElement} ObjectJSXElement
 */

/**
 * @param {FunctionJSXElement | ClassJSXElement | ObjectJSXElement} jsx
 * @returns {jsx is ClassJSXElement | FunctionJSXElement}
 */
export function isFunctionOrClassJSXElement(jsx) {
    return typeof jsx.jsxTag === "function";
}
