import { CookieStorage, ObservableFromEventListener } from "../..";
import { useObserve } from "./useObserve";

/**
 * @typedef {import('../types').ObservableType} ObservableType
 */

/**
 * Allows for observing changes in an object and synchronizing it with the browser's storage (such as localStorage).
 * @template {object} T
 * @param {T} item The object to be observed and synchronized with storage.
 * @param {Storage} [storage=localStorage] The storage object to be used (defaults to localStorage if not provided)
 * @returns {ObservableType<T>} A new observable
 */
export function useStorage(item, storage = localStorage) {
  function getStorageValue(key) {
    const localStorageValue = storage.getItem(key);
    if (localStorageValue)
      try {
        return JSON.parse(localStorageValue);
      } catch {
        return localStorageValue;
      }
    else return item[key];
  }
  const newObservable = useObserve(
    Object.keys(item).reduce(
      (previousValue, key) => ({
        ...previousValue,
        [key]: getStorageValue(key),
      }),
      {},
    ),
  );

  Object.entries(newObservable).forEach(([key, value]) => {
    value?.subscribe((newValue) => {
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
