import { useObserve } from "./useObserve";

const observer = useObserve(document.title);

observer.subscribe(newValue => document.title = newValue)

export function useTitle() {
  return observer;
}
