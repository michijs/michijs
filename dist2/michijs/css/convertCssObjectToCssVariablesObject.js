import { valueIsCSSObject } from "../typeWards/valueIsCSSObject";
import { formatToKebabCase } from "../utils";

/**
 * @typedef {import('../types').CSSProperty} CSSProperty
 */

/**
 * @param {CSSProperty} cssObject
 * @param {string[]} [properties=[]]
 * @returns {Record<string, string>}
 */
export const convertCssObjectToCssVariablesObject = (cssObject, properties = []) => {
    const notObservableCssObject = JSON.parse(JSON.stringify(cssObject));
    let obj = {};
    Object.entries(notObservableCssObject).forEach(([key, value]) => {
        if (valueIsCSSObject(value))
            obj = {
                ...obj,
                ...convertCssObjectToCssVariablesObject(value, properties.concat(key)),
            };
        else
            obj[formatToKebabCase(`--${properties.length > 0 ? `${properties.join("-")}-` : ""}${key}`)] = value;
    });

    return obj;
};
