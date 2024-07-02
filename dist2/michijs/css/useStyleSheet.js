import { ProxiedValue } from "../classes";
import { useComputedObserve, useObserve } from "../hooks";
import { formatToKebabCase, getObservables, bindObservable, unproxify, isNil, } from "../utils";
import { useCssVariables } from "./useCssVariables";

/**
 * @typedef {import('../types').AnyObject} AnyObject
 * @typedef {import('../types').CSSObject} CSSObject
 * @typedef {import('../types').UseStyleSheet} UseStyleSheet
 * @typedef {import('../types').UseStyleSheetCallback} UseStyleSheetCallback
 */





const hostSelectors = [":host", ":host-context"];

/**
 * @param {string} key
 * @returns {boolean}
 */
const isQuery = (key) => key.startsWith("@");

/**
 * @param {CSSObject} unproxifiedCssObject
 * @returns {string}
 */
export const hostToText = (unproxifiedCssObject, parentSelector = "") => {
    const thisRunObjectSelector = {};
    const otherRunsSelectors = Object.entries(unproxifiedCssObject).reduce((previousValue, [key, value]) => {
        if (!isNil(value)) {
            const valueIsObject = typeof value === "object";
            const newKey = formatToKebabCase(key);
            const isQueryResult = isQuery(newKey);
            if (valueIsObject) {
                if (isQueryResult)
                    return `${previousValue}${cssObjectToText({
                        [newKey]: {
                            [parentSelector]: value,
                        },
                    })}`;

                return `${previousValue}${hostToText(value, `${parentSelector}${newKey}`)}`;
            }
            thisRunObjectSelector[newKey] = value;
        }
        return previousValue;
    }, "");
    const thisRunObjectSelectorEntries = Object.entries(thisRunObjectSelector);
    const thisRunSelector = thisRunObjectSelectorEntries.length > 0
        ? `${parentSelector}{${thisRunObjectSelectorEntries.reduce((previousValue, [key, value]) => {
            return `${previousValue}${key}:${value};`;
        }, "")}}`
        : "";

    return `${otherRunsSelectors}${thisRunSelector}`;
};

/**
 * @param {CSSObject} cssObject
 * @param {boolean} [isChild]
 * @returns {string}
 */
export function cssObjectToText(cssObject, isChild) {
    const unproxifiedCssObject = unproxify(cssObject);
    let hostRules = "";
    const formattedObject = Object.entries(unproxifiedCssObject).reduce((previousValue, [key, value]) => {
        // & its not working for host
        if (hostSelectors.find((x) => key.startsWith(x))) {
            hostRules = `${hostRules}${hostToText(value, key)}`;
            return previousValue;
        }
        const valueIsObject = typeof value === "object";
        const isQueryResult = isQuery(key);
        const newKey = formatToKebabCase(isChild && !isQueryResult && valueIsObject ? `&${key}` : key);
        let newValue;
        let queries = "";

        if (valueIsObject) {
            let valueToStringify;
            // Preudo selectors doesnt support @media inside
            if (key.includes("::")) {
                valueToStringify = {};
                // Separate media from the rest
                Object.entries(value).forEach(([key, value]) => {
                    if (key.startsWith("@"))
                        queries += `${key}{${newKey}{${cssObjectToText(value, isChild || !isQueryResult)}}}`;
                    else
                        valueToStringify[key] = value;
                });
            }
            else
                valueToStringify = value;

            newValue = `{${cssObjectToText(valueToStringify, isChild || !isQueryResult)}}`;
        }
        else
            newValue = `:${value?.toString()};`;

        return `${previousValue}${queries}${newKey}${newValue}`;
    }, "");
    return `${formattedObject}${hostRules}`;
}

/**
 * @param {() => CSSObject} getCSSObject
 * @param {*[]} [additionalObservers=[]]
 * @returns {CSSStyleSheet}
 */
const styleSheetFromCSSObject = (getCSSObject, additionalObservers = []) => {
    const styleSheet = new CSSStyleSheet();
    const observables = getObservables(getCSSObject());
    const stringResult = useComputedObserve(() => cssObjectToText(getCSSObject()), [...observables, ...additionalObservers]);
    bindObservable(stringResult, (formattedObject) => {
        // Jest fix
        if (styleSheet.replaceSync)
            styleSheet.replaceSync(formattedObject);
    });
    return styleSheet;
};
/**Allows to create a Constructable Stylesheet with a CSSObject */
export const useStyleSheet = ((cssObject) => {
    if (typeof cssObject === "function" && !(cssObject instanceof ProxiedValue)) {
        const tags = useObserve(new Set());
        let styleSheet;
        return (tag) => {
            tags.add(tag);
            if (!styleSheet) {
                const cssVariables = useCssVariables();
                styleSheet = styleSheetFromCSSObject(() => cssObject(Array.from(tags).join(","), cssVariables), [tags]);
            }
            return styleSheet;
        };
    }
    return styleSheetFromCSSObject(() => cssObject);
});
