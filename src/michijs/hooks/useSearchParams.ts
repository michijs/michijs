import { useComputedObserve } from "./useComputedObserve";
import { HistoryManager } from "../classes";
import { setSearchParam } from "../routing/utils/setSearchParam";
import type { ObservableType } from "../types";

export const getSearchParamsValue = () => {
  const initialSearchParamsValue: Record<string, unknown> = {};
  new URLSearchParams(location.search).forEach((value, key) => {
    try {
      initialSearchParamsValue[key] = JSON.parse(value);
    } catch {
      initialSearchParamsValue[key] = value;
    }
  });
  return initialSearchParamsValue;
};

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
  T = Record<string, unknown>,
>(): ObservableType<T> {
  return SearchParams as unknown as ObservableType<T>;
}

SearchParams.subscribe((newValue) => {
  // Prevents pushing new urls while updating search params
  if (!isUpdating) {
    const newUrl = new URL(location.href);
    Object.keys(newValue).forEach((x) => {
      setSearchParam(newUrl, x, newValue[x]);
    });
    if (location.href !== newUrl.href) HistoryManager.push(newUrl);
  }
});
