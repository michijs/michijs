import { useObserve } from "./useObserve";

/**
 * @typedef {import('../types').ObservableType} ObservableType
 */

const observer = useObserve(document.title);

observer.subscribe((newValue) => (document.title = newValue));

/**
 * @returns {ObservableType<string>}
 */
export function useTitle() {
    return observer;
}
