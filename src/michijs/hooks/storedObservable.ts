import { deepEqual } from '../utils/deepEqual';
import { observable } from './observable';
import { observe } from './observe';

export function storedObservable<T extends object>(
  obj: T,
  storage: Storage = localStorage,
) {
  const { notify, ...observableProps } = observable<keyof T>(
    (newLength) => {
      if (newLength === 0) window.removeEventListener('storage', listener);
    },
    (newLength) => {
      if (newLength === 1) window.addEventListener('storage', listener);
    },
  );

  const listener = (ev: StorageEvent) => {
    if (ev.key && Object.keys(obj).includes(ev.key)) notify(ev.key as keyof T);
  };

  function getStorageValue(key: string) {
    const localStorageValue = storage.getItem(key);
    if (localStorageValue) {
      try {
        return JSON.parse(localStorageValue);
      } catch {
        return obj[key];
      }
    } else {
      return obj[key];
    }
  }

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
          propertyPath: '',
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
