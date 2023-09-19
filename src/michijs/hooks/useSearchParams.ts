import { useComputedObserve } from "./useComputedObserve";
import { HistoryManager } from "../classes/HistoryManager";
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

const SearchParams = useComputedObserve(() => getSearchParamsValue(), [HistoryManager]);

export function useSearchParams<T extends Record<string, unknown> = Record<string, unknown>>(): ObservableType<T> { return SearchParams as unknown as ObservableType<T> };


SearchParams.subscribe?.((newValue) => {
  console.log(newValue)
  const newUrl = new URL(location.href);
  Object.keys(newValue).forEach(x => {
    setSearchParam(newUrl, x, newValue[x]);
  })
  HistoryManager.push(newUrl);
})

// Object.entries(SearchParams).forEach(([key, value]) => {
//   value?.subscribe?.((newValue) => {
//     const newUrl = new URL(location.href);
//     const splittedKey = key.split(".")[1];
//     setSearchParam(newUrl, splittedKey, newValue);
//     HistoryManager.push(newUrl);
//   })
// })
