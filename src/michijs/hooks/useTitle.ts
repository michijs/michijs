import type { ObservableType } from "../types";
import { useObserve } from "./useObserve";

const observer = useObserve(document.title);

observer.subscribe((newValue) => (document.title = newValue));

export function useTitle(): ObservableType<string> {
  return observer;
}
