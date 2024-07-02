/**
 * @typedef {import('../types').ClassJSXElement} ClassJSXElement
 * @typedef {import('../types').FunctionJSXElement} FunctionJSXElement
 */

/**
 * @param {FunctionJSXElement | ClassJSXElement} param
 * @returns {param is ClassJSXElement}
 */
export function isClassJSXElement(param) {
  return "tag" in param.jsxTag.valueOf();
}
