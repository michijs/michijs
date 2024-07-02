/**
 * @typedef {import('../types').MichiCustomElement} MichiCustomElement
 */

/**
 * @param {Element} param
 * @returns {param is MichiCustomElement}
 */
export function isMichiCustomElement(param) {
    return "$michi" in param;
}
