/**
 * @typedef {import('../../types').MichiCustomElement} MichiCustomElement
 * @typedef {import('../../types').ObservableType} ObservableType
 */

/**
 * @param {MichiCustomElement} self
 * @param {string} propertyKey
 * @param {ObservableType<*>} observable
 * @param {string} [observableKey=propertyKey]
 */
export function definePropertyFromObservable(self, propertyKey, observable, observableKey = propertyKey) {
    Object.defineProperty(self, propertyKey, {
        get() {
            return observable[observableKey];
        },
        set(newValue) {
            observable[observableKey] = newValue;
        },
    });
}
