import type { ObservableType } from "../types";
import { useObserve } from "./useObserve";

const observer = useObserve(document.title);

observer.subscribe((newValue) => (document.title = newValue));

/**
 * Allows to observe the document title. Do not use document.title use this hook instead
 * @returns An Observable
 */
export function useTitle(): ObservableType<string> {
  return observer;
}
