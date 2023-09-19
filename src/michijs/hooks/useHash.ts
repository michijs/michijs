import { useComputedObserve } from "./useComputedObserve";
import { HistoryManager, ObservableFromEventListener } from "../classes";
import { ObservableType } from "../types";

const hashListener = new ObservableFromEventListener(window, 'hashchange')

const Hash = useComputedObserve(() => (!!location.hash ? {
  [location.hash]: true,
}: {}), [hashListener]);

export const useHash = <T extends string = string>() => Hash as ObservableType<Partial<Record<T, boolean>>>

Hash.subscribe?.((newValue) => {
  const [newHash] = newValue ? Object.entries(newValue).find(([_, value]) => value.valueOf()) ?? [''] : [''];
  const newUrl = new URL(location.href);
  newUrl.hash = newHash;
  HistoryManager.push(newUrl);
})