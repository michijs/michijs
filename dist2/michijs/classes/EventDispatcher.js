/**
 * @template T
 */
export class EventDispatcher {
    /**
     * @private
     * @type {string}
     */
    name;
    /**
     * @private
     * @type {EventInit}
     */
    eventInit;

    /**
     * @param {EventInit} [eventInit]
     */
    constructor(eventInit) {
        this.eventInit = eventInit;
    }

    /**
     * @public
     * @param {string} name
     */
    init(name) {
        this.name = name.toLowerCase();
    }

    /**
     * @public
     * @param {Element} targetElement
     * @param {T} [detail]
     */
    dispatch(targetElement, detail) {
        const event = new CustomEvent(this.name, {
            ...this.eventInit,
            detail: detail?.valueOf(),
        });
        return targetElement.dispatchEvent(event);
    }
}
