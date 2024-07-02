import { Observable } from "./Observable";

/**
 * @typedef {import('../generated/htmlType').GlobalEvents} GlobalEvents
 * @typedef {import('../generated/htmlType').SVGEvents} SVGEvents
 * @typedef {import('../generated/htmlType').MathMLEvents} MathMLEvents
 * @typedef {import('../generated/htmlType').WindowEvents} WindowEvents
 */

/**
 * @template {EventTarget} T
 * @typedef {GlobalEvents<T> & MathMLEvents<T> & SVGEvents<T> & WindowEvents<T>} AllEvents
 */

/**
 * @template {EventTarget} T
 * @typedef {Required<AllEvents<T>>} AllEventsNotUndefined
 */

/**
 * @template {EventTarget} T
 * @typedef {{ [k in keyof AllEventsNotUndefined<T> as k extends `on${infer S}` ? S : k]: AllEventsNotUndefined<T>[k] extends ((e: any) => any) | undefined ? Parameters<AllEventsNotUndefined<T>[k]>[0] : unknown; }} EventsMap
 */

/**
 * @template {EventTarget} T
 * @template {keyof EventsMap<T>} K
 */
export class ObservableFromEventListener extends Observable {
    /**
     * @param {T} obj
     * @param {K} key
     */
    constructor(obj, key) {
        super();
        obj.addEventListener(key, (e) => this.notify(e));
    }
}
