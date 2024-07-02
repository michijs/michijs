import { create } from "../DOMDiff";
import { ProxiedValue, VirtualFragment } from "../classes";
import { bindObservable } from "../utils";
import { useComputedObserve } from "../hooks";

/**
 * @typedef {import('../types').CreateOptions} CreateOptions
 * @typedef {import('../types').ExtendableComponentWithoutChildren} ExtendableComponentWithoutChildren
 * @typedef {import('../types').CreateFCResult} CreateFCResult
 * @typedef {import('../types').SingleJSXElement} SingleJSXElement
 */



/**
 * @template T
 * @typedef {ExtendableComponentWithoutChildren<T> & {condition: any; then?: JSX.Element | (() => JSX.Element); else?: JSX.Element | (() => JSX.Element);enableCache?: boolean; }} IfProps
 */

/**
 * Conditional rendering component. This is the only way to do it dynamically.
 * @template [T = CreateFCResult]
 * @param {IfProps<T>}
 * @param {CreateOptions} options
 * @returns {Node}
 */
export const If = ({ as: asTag, condition, then, else: elseComponent, enableCache, ...attrs }, options) => {
    // Create an element or a virtual fragment depending on the 'asTag' prop.
    const el = asTag
        ? create({
            jsxTag: asTag,
            attrs,
        })
        : new VirtualFragment();

    let cachedThen;
    let cachedElse;

    const conditionAsBoolean = useComputedObserve(() => condition instanceof ProxiedValue ? condition.toBoolean() : condition, [condition]);

    // Bind the observable 'condition' to monitor changes.
    bindObservable(conditionAsBoolean, (newValue) => {
        const newCache = el.childNodes.length
            ? Array.from(el.childNodes)
            : undefined;
        if (newValue) {
            if (newCache) {
                const fragment = new DocumentFragment();
                fragment.append(...newCache);
                if (enableCache)
                    cachedElse = fragment;
            }
            if (cachedThen)
                el.replaceChildren(cachedThen);
            else if (then)
                el.replaceChildren(create(typeof then === "function" ? then() : then, options));
        }
        else {
            if (newCache) {
                const fragment = new DocumentFragment();
                fragment.append(...newCache);
                if (enableCache)
                    cachedThen = fragment;
            }
            if (cachedElse)
                el.replaceChildren(cachedElse);
            else if (elseComponent)
                el.replaceChildren(create(typeof elseComponent === "function"
                    ? elseComponent()
                    : elseComponent, options));
        }
    });

    // Return the rendered element.
    return el.valueOf();
};
