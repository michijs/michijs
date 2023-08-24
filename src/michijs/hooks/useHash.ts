import { useComputedObserve } from ".";
import { goTo } from "../routing/goTo";
import { UrlObservable } from "../classes/UrlObservable";

export const useHash = useComputedObserve(() => ({
  [location.hash]: true,
}), [UrlObservable])

useHash.subscribe?.((newValue) => {
  const [newHash] = newValue ? Object.entries(newValue).find(([_, value]) => value) ?? [''] : [''];
  const newUrl = new URL(location.href);
  newUrl.hash = newHash;
  goTo(newUrl);
})