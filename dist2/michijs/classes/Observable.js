/**
 * @typedef {import('../types').ObservableLike} ObservableLike
 * @typedef {import('../types').Subscription} Subscription
 */

/**
 * @template T
 * @implements {ObservableLike<T>}
 */
export class Observable extends Function {
    // Intentional explicit null value - it breaks proxy otherwise
    /**
     * @type {Set<Subscription<T>> | null}
     */
    observers = null;

    /**
     * @param {Subscription<T>[]} [initialObservers]
     */
    constructor(initialObservers) {
        super();
        if (initialObservers)
            this.observers = new Set(initialObservers);
    }

    /**
     * @param {T} value
     */
    notify(value) {
        this.observers?.forEach((observer) => {
            observer(value);
        });
    }

    /**
     * @param {Subscription<T>} observer
     */
    subscribe(observer) {
        if (this.observers)
            this.observers.add(observer);
        else
            this.observers = new Set([observer]);
    }

    /**
     * @param {Subscription<T>} oldObserver
     */
    unsubscribe(oldObserver) {
        this.observers?.delete(oldObserver);
    }
}
