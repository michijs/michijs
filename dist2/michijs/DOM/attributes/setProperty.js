import { setStyle } from "./setStyle";
import { setAttribute } from "./setAttribute";
import { bindFunction } from "../../utils/bindFunction";
import { bindObservableToRef } from "../../utils";
import { isMichiCustomElement } from "../../typeWards/isMichiCustomElement";

/**
 * @typedef {import('../../types').CreateOptions} CreateOptions
 */

/**
 * @typedef {import('../../generated/htmlType').CSSProperties} CSSProperties
 */



/**
 * @param {Element} el
 * @param {string} name
 * @param {*} newValue
 * @param {CreateOptions} [options]
 */
export function setProperty(el, name, newValue, options) {
    // priority to properties and events
    if (name === "_")
        Object.entries(newValue).forEach(([propertyName, value]) => bindObservableToRef(value, el, (newValue, el) => (el[propertyName] = newValue)));
    else if (name.startsWith("on")) {
        const eventName = name.slice(2);
        const bindedEvent = bindFunction(options?.contextElement, newValue);
        el.addEventListener(eventName, bindedEvent);
    }
    else if (name === "style" && typeof newValue === "object")
        setStyle(el, newValue);
    else if (name === "class" &&
        isMichiCustomElement(el) &&
        el.$michi.styles.className)
        bindObservableToRef(newValue, el, (newValue, el) => {
            const newValueWithClassName = `${newValue} ${el.$michi.styles.className}`;
            setAttribute(el, name, newValueWithClassName);
        });
    else
        bindObservableToRef(newValue, el, (newValue, el) => setAttribute(el, name, newValue));
}
