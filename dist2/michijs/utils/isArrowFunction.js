/**
 * @param {Function} arrowFunction
 * @returns {boolean}
 */
export function isArrowFunction(arrowFunction) {
    return arrowFunction.toString().startsWith("(");
}
