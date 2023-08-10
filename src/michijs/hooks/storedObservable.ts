import { ProxiedValue } from "../classes/ProxiedValue";
import { Observable } from "../types";
import { deepEqual } from "../utils/deepEqual";
import { observe } from "./observe";

export function storedObservable<T extends object>(
  item: T,
  storage: Storage = localStorage,
): Observable<T> {
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

  const newObservable = Object.keys(item).reduce((previousValue, key) => {
    return observe(
      { ...previousValue, key: getStorageValue(key) },
      new Set([
        () => {
          storage.setItem(key, JSON.stringify(newObservable[key]));
        },
      ]),
    );
  }, {}) as T;

  const storageStore = new Proxy(
    {},
    {
      get(_t, p: keyof T & keyof typeof observableProps) {
        if (Object.keys(observableProps).includes(p)) {
          return observableProps[p];
        }
        const value = observe({
          item: getStorageValue(p),
          onChange: (_key) => {
            storage.setItem(p, JSON.stringify(value));
            notify(p);
          },
          shouldValidatePropertyChange: () => true,
          propertyPath: "",
        });
        return value;
      },
      set(_t, p, value) {
        if (!deepEqual(JSON.stringify(value), getStorageValue(p as string))) {
          storage.setItem(p as string, JSON.stringify(value));
          notify(p as keyof T);
        }
        return true;
      },
    },
  ) as T & typeof observableProps;

  return storageStore;
}
