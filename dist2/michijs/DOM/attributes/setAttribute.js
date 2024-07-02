/**
 * @param {Element | HTMLElement} element
 * @param {string} key
 * @param {*} newValue
 */
export function setAttribute(element, key, newValue) {
    const value = newValue?.valueOf();
    switch (true) {
        case value === null:
        case value === undefined:
        case typeof value === "boolean": {
            if (value)
                element.setAttribute(key, "");
            else
                element.removeAttribute(key);
            break;
        }
        case typeof value === "object": {
            element.setAttribute(key, JSON.stringify(value));
            break;
        }
        default: {
            element.setAttribute(key, value);
        }
    }
}
