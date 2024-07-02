import { create } from "../DOMDiff";
import { jsx } from "../h";
import { VirtualFragment } from "../classes";
import { isObservableType } from "../typeWards/isObservableType";
import { bindObservable } from "../utils";

/**
 * @typedef {import('../types').CreateOptions} CreateOptions
 * @typedef {import('../types').ExtendableComponentWithoutChildren} ExtendableComponentWithoutChildren
 * @typedef {import('../types').CreateFCResult} CreateFCResult
 * @typedef {import('../types').SingleJSXElement} SingleJSXElement
 * @typedef {import('../types').ObservableOrConst} ObservableOrConst
 */





/**
 * @template P
 * @typedef {| Promise<{ default: P }> | Promise<P> | (() => Promise<P>) | (() => Promise<{ default: P }>)} PromiseType
 */

/**
 * @template P
 * @template T
 * @typedef {ExtendableComponentWithoutChildren<T> & { promise: ObservableOrConst<PromiseType<P>>; loadingComponent?: JSX.Element; then?(promiseResult: P): JSX.Element; catch?(reason: any): JSX.Element; }} AsyncComponentProps
 */

/**
 * Asynchronously renders a component after the promise ends. In the meantime you can choose to show a load component or not show anything.
 * @template P
 * @template [T = CreateFCResult]
 * @param {AsyncComponentProps<P, T>}
 * @param {CreateOptions} options
 * @returns {Node}
 */
export const AsyncComponent = ({ as: asTag, promise, loadingComponent, catch: errorComponent, then, ...attrs }, options) => {
    let el = asTag
        ? create({
            jsxTag: asTag,
            attrs,
        })
        : new VirtualFragment();

    // If a loading component is provided, append it to the element.
    if (loadingComponent)
        el.append(create(loadingComponent, options));

    // Function to render the component when the promise resolves.
    const render = (promiseResult) => {
        const oldEl = el;
        const Res = (promiseResult &&
            typeof promiseResult === "object" &&
            "default" in promiseResult
            ? promiseResult.default
            : promiseResult);

        // Create and replace the element with the resolved component.
        el = create(then ? then(Res) : Res && typeof Res === "function" ? jsx(Res) : Res, options);
        oldEl.replaceWith(el);
    };

    // Execute the promise and render the component when it resolves.
    const renderCallback = (p) => (typeof p === "function" ? p() : p)
        .then((res) => render(res))
        .catch((e) => {
        if (errorComponent) {
            render(errorComponent(e));
        }
        else
            throw e;
    });

    if (isObservableType(promise))
        bindObservable(promise, renderCallback);
    else
        renderCallback(promise);

    // Return the rendered element.
    return el.valueOf();
};
