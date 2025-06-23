import { ObservableFromEventListener } from "../classes/ObservableFromEventListener";
import type { UseStorage } from "../types";
import { useObserveInternal } from "./useObserve";
import { isNil } from "../utils/isNil";
import { storageIsModernCookieStorage } from "../typeWards/storageIsModernCookieStorage";

/**
 * Allows for observing changes in an object and synchronizing it with the browser's storage (such as localStorage).
 * @param item The object to be observed and synchronized with storage.
 * @param storage The storage object to be used (defaults to localStorage if not provided)
 * @returns A new observable
 */
export const useStorage: UseStorage = (item, storage = localStorage) => {
  function parseStorageValue(key, value: string | null) {
    if (value)
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    else return item[key];
  }
  function getStorageValue(key: string) {
    const localStorageValue = storage.getItem(key);
    return parseStorageValue(key, localStorageValue);
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

  if ([localStorage, sessionStorage].includes(storage)) {
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
  } else if ("cookieStore" in window && storageIsModernCookieStorage(storage)) {
    storage.observable.subscribe(async (changes) => {
      for (const key in item)
        if (changes.includes(key))
          newObservable[key as string] = parseStorageValue(
            key,
            storage.getItem(key),
          );
    });
  }

  return newObservable as any;
};
