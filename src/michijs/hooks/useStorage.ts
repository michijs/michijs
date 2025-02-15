import { CookieStorage } from "../classes/CookieStorage";
import { ObservableFromEventListener } from "../classes/ObservableFromEventListener";
import type { UseStorage } from "../types";
import { useObserveInternal } from "./useObserve";
import { isNil } from "../utils/isNil";

/**
 * Allows for observing changes in an object and synchronizing it with the browser's storage (such as localStorage).
 * @param item The object to be observed and synchronized with storage.
 * @param storage The storage object to be used (defaults to localStorage if not provided)
 * @returns A new observable
 */
export const useStorage: UseStorage = (item, storage = localStorage) => {
  function getStorageValue(key: string) {
    const localStorageValue = storage.getItem(key);
    if (localStorageValue)
      try {
        return JSON.parse(localStorageValue);
      } catch {
        return localStorageValue;
      }
    else return item[key];
  }
  const newObservable = useObserveInternal(
    Object.keys(item).reduce(
      (previousValue, key) => ({
        ...previousValue,
        [key]: getStorageValue(key),
      }),
      {},
    ),
  );

  for (const [key, value] of Object.entries(newObservable)) {
    value?.subscribe((newValue) => {
      if (isNil(newValue)) storage.removeItem(key);
      else storage.setItem(key, JSON.stringify(newValue));
    });
  }

  if (storage instanceof CookieStorage) {
    CookieStorage.cookieStoreObservable.subscribe((ev) => {
      for (const key in item)
        if (ev.includes(key))
          newObservable[key as string] = getStorageValue(key);
    });
  } else {
    const windowObservable = new ObservableFromEventListener<StorageEvent>(
      window,
      "storage",
    );

    windowObservable.subscribe((ev) => {
      if (
        ev?.key &&
        ev.storageArea === storage &&
        Object.keys(item).includes(ev.key)
      )
        newObservable[ev.key] = getStorageValue(ev.key);
    });
  }

  return newObservable as any;
};
