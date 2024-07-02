import { useComputedObserve } from "./useComputedObserve";

/**
 * @typedef {import('../types').ObservableOrConst} ObservableOrConst
 * @typedef {import('../types').ObservableType} ObservableType
 */

/**
 * It is used to create a string template by interpolating dynamic values.
 * @param {TemplateStringsArray} templateStringsArray An array of strings representing the template literals.
 * @param {...ObservableOrConst<string | number | undefined>} [props] An array of dynamic values that will be interpolated into the template.
 * @returns {ObservableType<string>} A new observable
 */
export function useStringTemplate(templateStringsArray, ...props) {
    return useComputedObserve(() => {
        return templateStringsArray.raw.reduce((previousValue, currentValue, i) => {
            const val = props[i];
            return `${previousValue}${currentValue}${val ? val.valueOf() ?? "" : ""}`;
            // The accumulator takes the first value if you don't pass a value as the second argument:
        }, "");
    }, props);
}
