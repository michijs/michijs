import { useObserve, type CallableReactiveValuePort } from "#domain";

const observer = useObserve(document.title);

observer.subscribe((newValue) => (document.title = newValue));

/**
 * Allows to observe the document title. Do not use document.title use this hook instead
 * @returns An Observable
 */
export const useTitle = (): CallableReactiveValuePort<string> => observer;
