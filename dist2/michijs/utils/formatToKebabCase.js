/**
 * @param {string} variable
 * @returns {string}
 */
export function formatToKebabCase(variable) {
    return variable.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}
