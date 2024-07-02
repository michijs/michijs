/**
 * @typedef {import('../../classes').EventDispatcher} EventDispatcher
 */

/**
 * @typedef {import('../../types').MichiCustomElement} MichiCustomElement
 */

/**
 * @param {MichiCustomElement} self
 * @param {string} propertyKey
 * @param {EventDispatcher<*>} eventDispatcher
 */
export function defineEvent(self, propertyKey, eventDispatcher) {
    Object.defineProperty(self, propertyKey, {
        get() {
            return (detail) => eventDispatcher.dispatch(self, detail);
        },
    });
}
