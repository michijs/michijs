import { ObservableFromEventListener } from "../classes";
import { ObservableType } from "../types";
import { useObserve } from "./useObserve";

export function useStorage<T extends object>(
  item: T,
  storage: Storage = localStorage,
): ObservableType<T> {
  function getStorageValue(key: string) {
    const localStorageValue = storage.getItem(key);
    if (localStorageValue) {
      try {
        return JSON.parse(localStorageValue);
      } catch {
        return item[key];
      }
    } else {
      return item[key];
    }
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
      storage.setItem(key, JSON.stringify(newValue));
    });
  });

  const windowObservable = new ObservableFromEventListener(window, "storage");

  windowObservable.subscribe?.((ev) => {
    if (ev?.key && Object.keys(item).includes(ev.key))
      newObservable[ev.key] = getStorageValue(ev.key);
  });

  return newObservable;
}
