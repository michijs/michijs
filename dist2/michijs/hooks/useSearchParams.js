import { useComputedObserve } from "./useComputedObserve";
import { HistoryManager } from "../classes";
import { setSearchParam } from "../routing/utils/setSearchParam";

/**
 * @typedef {import('../types').ObservableType} ObservableType
 */

/**
 * @returns {Record<string, ?>}
 */
export const getSearchParamsValue = () => {
  const initialSearchParamsValue = {};
  new URLSearchParams(location.search).forEach((value, key) => {
    try {
      initialSearchParamsValue[key] = JSON.parse(value);
    } catch {
      initialSearchParamsValue[key] = value;
    }
  });
  return initialSearchParamsValue;
};

/**
 * @type {boolean}
 */
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
 * @template [T = Record<string, unknown>]
 * @returns {ObservableType<T>} A new observable
 */
export function useSearchParams() {
  return SearchParams;
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
