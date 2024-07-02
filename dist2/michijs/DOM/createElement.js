import { createObject } from "../DOMDiff/createObject";

/**
 * @typedef {import('../types').CreateOptions} CreateOptions
 * @typedef {import('../types').GetElementProps} GetElementProps
 */

/**
 * @template {string} T
 * @template {GetElementProps<T> | JSX.IntrinsicElements["div"]} A
 * @template {T extends keyof HTMLElementTagNameMap
 * ? HTMLElementTagNameMap[T]
 * : T extends keyof SVGElementTagNameMap
 *   ? SVGElementTagNameMap[T]
 *   : HTMLElement} E
 * @param {T} tagName
 * @param {A} [attributes]
 * @param {ElementCreationOptions & CreateOptions}
 * @returns {E & ((props?: A) => E)}
 */
export function createElement(tagName, attributes, { is, ...options } = {}) {
    const el = createObject({
        jsxTag: tagName,
        attrs: {
            ...(attributes ?? {}),
            is,
        },
    }, options);

    return el;
}
