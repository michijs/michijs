import type { ObservableType } from "../../../../michijs/types";
import { useObserveInternal } from "../../../../domain/use-cases/hooks/useObserve";

const observer = useObserveInternal(document.title);

observer.subscribe((newValue) => (document.title = newValue));

/**
 * Allows to observe the document title. Do not use document.title use this hook instead
 * @returns An Observable
 */
export const useTitle = (): ObservableType<string> => observer;
