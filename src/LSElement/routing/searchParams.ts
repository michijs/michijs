import { observe } from '../hooks';
import { goTo } from './goTo';
import { setSearchParam } from './utils/setSearchParam';
import { sharedUrlObservable } from './utils/sharedUrlObservable';

export const getInitialSearchParamsValue = () => {
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

let isUpdating = false;
export const searchParams = observe({
  item: getInitialSearchParamsValue(),
  onChange: (key) => {
    if (!isUpdating) {
      const newUrl = new URL(location.href);
      setSearchParam(newUrl, key.toString(), searchParams[key]);
      goTo(newUrl);
    }
  },
  shouldValidatePropertyChange: () => true
});
const updateSearchParams = () => {
  isUpdating = true;
  // TODO: find a better way to do this
  const newInitialValue = getInitialSearchParamsValue();
  Object.keys(searchParams).forEach(key => {
    delete searchParams[key];
  });
  Object.entries(newInitialValue).forEach(([key, newValue]) => {
    searchParams[key] = newValue;
  });

  isUpdating = false;
};

sharedUrlObservable.subscribe(() => {
  updateSearchParams();
});
