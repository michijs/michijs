import { CookieStorage } from "../classes/CookieStorage";
import { ObservableFromEventListener } from "../classes/ObservableFromEventListener";
import type { ObservableType } from "../types";
import { useObserve } from "./useObserve";
import { isNil } from "../utils/isNil"

/**
 * Allows for observing changes in an object and synchronizing it with the browser's storage (such as localStorage).
 * @param item The object to be observed and synchronized with storage.
 * @param storage The storage object to be used (defaults to localStorage if not provided)
 * @returns A new observable
 */
export function useStorage<T extends object>(
  item: T,
  storage: Storage = localStorage,
): ObservableType<T> {
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
  const newObservable = useObserve<T>(
    Object.keys(item).reduce(
      (previousValue, key) => ({
        ...previousValue,
        [key]: getStorageValue(key),
      }),
      {} as T,
    ),
  );

  Object.entries(newObservable).forEach(([key, value]) => {
    value?.subscribe((newValue) => {
      if(isNil(newValue))
        storage.removeItem(key);
      else
        storage.setItem(key, JSON.stringify(newValue));
    });
  });

  if (storage instanceof CookieStorage) {
    CookieStorage.cookieStoreObservable.subscribe((ev) => {
      Object.keys(item)
        .filter((e) => ev.includes(e))
        .forEach((key) => {
          newObservable[key] = getStorageValue(key);
        });
    });
  } else {
    const windowObservable = new ObservableFromEventListener(window, "storage");

    windowObservable.subscribe((ev) => {
      if (
        ev?.key &&
        ev.storageArea === storage &&
        Object.keys(item).includes(ev.key)
      )
        newObservable[ev.key] = getStorageValue(ev.key);
    });
  }

  return newObservable;
}
