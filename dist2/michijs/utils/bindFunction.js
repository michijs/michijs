import { isArrowFunction } from "./isArrowFunction";

/**
 * @template {Function | undefined} T
 * @param {Element | null | undefined} self
 * @param {T} event
 * @returns {T}
 */
export function bindFunction(self, event) {
    if (event) {
        const needsToBeBinded = self && !isArrowFunction(event);
        return needsToBeBinded ? event.bind(self) : event;
    }
    return event;
}
