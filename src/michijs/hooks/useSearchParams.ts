import { useComputedObserve } from "./useComputedObserve";
import { HistoryManager } from "../classes/HistoryManager";
import { setSearchParam } from "../routing/utils/setSearchParam";
import type { AnyObject, ObservableType } from "../types";
import { getSearchParamsValue } from "../utils/getSearchParamsValue";

let isUpdating = false;

const SearchParams = useComputedObserve(
  () => getSearchParamsValue(),
  [HistoryManager],
  {
    onBeforeUpdate() {
      isUpdating = true;
    },
    onAfterUpdate() {
      isUpdating = false;
    },
  },
);

/**
 * It facilitates the management and observation of search parameters in the URL, providing a reactive way to handle changes and update the URL accordingly.
 * @returns A new observable
 */
export function useSearchParams<
  // Removed because it doesnt work with observables
  // T extends Record<string, unknown> = Record<string, unknown>,
  T = AnyObject,
>(): ObservableType<T> {
  return SearchParams as unknown as ObservableType<T>;
}

SearchParams.subscribe((newValue) => {
  // Prevents pushing new urls while updating search params
  if (!isUpdating) {
    const newUrl = new URL(location.href);
    for (const x in newValue) setSearchParam(newUrl, x, newValue[x]);
    if (location.href !== newUrl.href) HistoryManager.push(newUrl);
  }
});
