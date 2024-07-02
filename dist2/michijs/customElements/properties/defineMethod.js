/**
 * @typedef {import('../../types').MichiCustomElement} MichiCustomElement
 */

/**
 * @param {MichiCustomElement} self
 * @param {string} propertyKey
 * @param {Function} method
 */
export function defineMethod(self, propertyKey, method) {
    const bindedFunction = method.bind(self);
    Object.defineProperty(self, propertyKey, {
        get() {
            return bindedFunction;
        },
    });
}
