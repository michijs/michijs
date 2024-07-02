/**
 * @typedef {object} TrustedTypeObject
 * @property {(x: string) => string} createHTML
 * @property {(x: string) => string} createScript
 * @property {(x: string) => string} createScriptURL
 */
/**
 * @param {string} x
 * @returns {string}
 */
const returnParameter = (x) => x;

/**
 * @type {TrustedTypeObject}
 */
const trustedTypeObject = {
    createHTML: returnParameter,
    createScript: returnParameter,
    createScriptURL: returnParameter,
};

/**
 * @type {TrustedTypeObject}
 */
export const trustedTypePolicy = 
// @ts-ignore
window.trustedTypes && trustedTypes.createPolicy
    ? // @ts-ignore
        trustedTypes.createPolicy("michijs", trustedTypeObject)
    : trustedTypeObject;
