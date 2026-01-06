import { useComputedObserve } from "./useComputedObserve";
import "../classes/HistoryManager";
import "../routing/utils/setSearchParam";
import "../types";
import "../utils/getSearchParamsValue";

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
export const useSearchParams: UseSearchParams = () => SearchParams as any;

SearchParams.subscribe((newValue) => {
  // Prevents pushing new urls while updating search params
  if (!isUpdating) {
    const newUrl = new URL(location.href);
    for (const x in newValue) setSearchParam(newUrl, x, newValue[x]);
    if (location.href !== newUrl.href) HistoryManager.push(newUrl);
  }
});
