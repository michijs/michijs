import { useComputedObserve } from "./useComputedObserve";
import { HistoryManager } from "../classes";
import { setSearchParam } from "../routing/utils/setSearchParam";
import { ObservableType } from "../types";
// // import { setSearchParam } from "../routing/utils/setSearchParam";

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

export function useSearchParams<
  T extends Record<string, unknown> = Record<string, unknown>,
>(): ObservableType<T> {
  return SearchParams as unknown as ObservableType<T>;
}

SearchParams.subscribe?.((newValue) => {
  // Prevents pushing new urls while updating search params
  if (!isUpdating) {
    const newUrl = new URL(location.href);
    Object.keys(newValue).forEach((x) => {
      setSearchParam(newUrl, x, newValue[x]);
    });
    if (location.href !== newUrl.href) HistoryManager.push(newUrl);
  }
});

// Object.entries(SearchParams).forEach(([key, value]) => {
//   value?.subscribe?.((newValue) => {
//     const newUrl = new URL(location.href);
//     const splittedKey = key.split(".")[1];
//     setSearchParam(newUrl, splittedKey, newValue);
//     HistoryManager.push(newUrl);
//   })
// })
