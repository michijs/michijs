import type { ObservableType } from "../types";
import { useObserveInternal } from "./useObserve";

const observer = useObserveInternal(document.title);

observer.subscribe((newValue) => (document.title = newValue));

/**
 * Allows to observe the document title. Do not use document.title use this hook instead
 * @returns An Observable
 */
export const useTitle = (): ObservableType<string> => observer;