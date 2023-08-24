import { useComputedObserve } from ".";
import { goTo } from "../routing/goTo";
import { setSearchParam } from "../routing/utils/setSearchParam";
import { UrlObservable } from "../classes/index";

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

export const useSearchParams = useComputedObserve(getSearchParamsValue, [UrlObservable])

Object.entries(useSearchParams).forEach(([key, value]) => {
  value?.subscribe?.((newValue) => {
    const newUrl = new URL(location.href);
    const splittedKey = key.split(".")[1];
    setSearchParam(newUrl, splittedKey, newValue);
    goTo(newUrl);
  })
})
