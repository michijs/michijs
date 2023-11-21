import { useComputedObserve } from "./useComputedObserve";
import { HistoryManager } from "../classes";
import { ObservableType } from "../types";

// hashchange does not work properly
// const hashListener = new ObservableFromEventListener(window, 'hashchange')

const Hash = useComputedObserve(
  () =>
    !!location.hash
      ? {
          [location.hash]: true,
        }
      : {},
  [HistoryManager],
);

export const useHash = <T extends string = string>() =>
  Hash as ObservableType<Record<T, boolean>>;

Hash.subscribe?.((newValue) => {
  const [newHash] = newValue
    ? Object.entries(newValue).find(([_, value]) => value.valueOf()) ?? [""]
    : [""];
  const newUrl = new URL(location.href);
  newUrl.hash = newHash;
  if (location.hash !== newUrl.hash) HistoryManager.push(newUrl);
});
