import { isNil } from "../../utils";

/**
 * @param {HTMLElement} element
 * @param {string} key
 * @param {?} value
 */
export const setStyleProperty = (element, key, value) => {
    if (!isNil(value))
        element.style.setProperty(key, value.toString());
    else
        element.style.removeProperty(key);
};
