import { overrideCallbackWithRef } from "../utils/overrideCallbackWithRef";
import { createTextElement } from "./createTextElement";

/**
 * @typedef {import('../types').ObservableNonNullablePrimitiveType} ObservableNonNullablePrimitiveType
 */

/**
 * @param {ObservableNonNullablePrimitiveType} jsx
 * @returns {Text}
 */
export const createObservableTextElement = (jsx) => {
    const textNode = createTextElement(jsx.$value);
    overrideCallbackWithRef(textNode, jsx, (newValue, el) => (el.textContent =
        (typeof newValue === "object"
            ? JSON.stringify(newValue)
            : newValue?.toString()) ?? ""));
    return textNode;
};
