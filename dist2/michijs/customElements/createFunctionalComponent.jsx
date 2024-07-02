import { useObserve } from "../hooks";
import { isObservableType } from "../typeWards/isObservableType";
import { unproxify } from "../utils";

/**
 * @typedef {import('../types').AnyObject} AnyObject
 * @typedef {import('../types').CreateOptions} CreateOptions
 * @typedef {import('../types').CreateFCResult} CreateFCResult
 * @typedef {import('../types').CreateFunctionalComponent} CreateFunctionalComponent
 */



/**
 * @template {AnyObject} T
 * @template {Element} [S = Element]
 * @template [C = CreateOptions<S>]
 * @param {CreateFCResult<T, S, C>} callback
 * @returns {CreateFunctionalComponent<T>}
 */
export function createFunctionalComponent(callback) {
    return (props) => {
        // TODO: Not sure why ts compiler is complaining here
        // @ts-ignore
        const newProps = Object.entries(props).reduce((previousValue, [key, value]) => {
            if (key === "children")
                previousValue[key] = value;
            else if (isObservableType(value)) {
                previousValue[key] = useObserve(unproxify(value));
                value.subscribe((newValue) => (previousValue[key] = newValue));
            }
            else
                previousValue[key] = useObserve(value);
            return previousValue;
        }, {});
        return callback(newProps);
    };
}
