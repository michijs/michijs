import { useComputedObserve } from "./useComputedObserve";
import { HistoryManager } from "../../domain/routing/HistoryManager/index";
import type { UseHash } from "../../shared/types/types";

// hashchange does not work properly
// const hashListener = new ObservableFromEventListener(window, 'hashchange')

const Hash = useComputedObserve(
  () =>
    location.hash
      ? {
          [location.hash]: true,
        }
      : {},
  [HistoryManager],
);

/**
 * It is designed to manage the hash portion of the URL. Provides a way to manage and observe changes in the hash portion of the URL, ensuring synchronization between the hash value and the observable state.
 * @returns An observable with keys of type T and boolean values.
 */
export const useHash: UseHash = () => Hash as any;

Hash.subscribe((newValue) => {
  const hashes = Object.entries(newValue).filter(([_, value]) =>
    value?.valueOf(),
  );
  if (hashes.length > 1) {
    Hash[location.hash]?.(false);
  } else {
    const [newHash] = hashes[0] ?? [""];
    const newUrl = new URL(location.href);
    newUrl.hash = newHash;
    if (location.hash !== newUrl.hash) HistoryManager.push(newUrl);
  }
});
