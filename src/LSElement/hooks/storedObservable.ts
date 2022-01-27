import { STORED_ATTRIBUTES_EVENTS } from '../constants';
import { StorageLocalChangeEventType } from '../types';
import { observable } from './observable';
import { observe } from './observe';
import { deepEqual } from '../utils/deepEqual';

const { STORAGE, STORAGE_LOCAL_CHANGE } = STORED_ATTRIBUTES_EVENTS;

export function storedObservable<T extends object>(obj: T, storage: Storage = localStorage) {
  const listener = (storageEvent: StorageEvent | CustomEvent<StorageLocalChangeEventType>) => {
    //@ts-ignore
    const event: StorageLocalChangeEventType = storageEvent.detail ? storageEvent.detail : storageEvent;
    if (Object.keys(obj).includes(event.key)) {
      const newValue = get();
      if (!deepEqual(proxiedObject[event.key], newValue[event.key])) {
        proxiedObject[event.key] = newValue[event.key];
      }
      notify(event.newValue);
    }
  };
  const { notify, ...observableProps } = observable<Event>(
    (newLength) => {
      if (newLength === 0) {
        window.removeEventListener(STORAGE, listener);
        window.removeEventListener(STORAGE_LOCAL_CHANGE, listener);
      }
    }, (newLength) => {
      if (newLength === 1) {
        window.addEventListener(STORAGE, listener);
        window.addEventListener(STORAGE_LOCAL_CHANGE, listener);
      }
    }
  );

  const get = () => {
    const res = {} as T;
    Object.keys(obj).forEach(key => {
      const localStorageValue = storage.getItem(key);
      if (localStorageValue) {
        try {
          res[key] = JSON.parse(localStorageValue);
        }catch{
          res[key] = obj[key];
        }
      }
    });
    return res;
  };

  const proxiedObject = observe({
    item: { ...observableProps, ...obj, ...get() },
    onChange: (key: string) => {
      const newValue = proxiedObject[key];
      storage.setItem(key, JSON.stringify(newValue));
      window.dispatchEvent(new CustomEvent<StorageLocalChangeEventType>(STORAGE_LOCAL_CHANGE, { detail: { key, newValue } }));
    },
    shouldValidatePropertyChange: () => true
  });

  return proxiedObject;
}