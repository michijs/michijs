import { STORED_ATTRIBUTES_EVENTS } from '../constants';
import { StorageLocalChangeEventType } from '../types';
import { observable } from './observable';
import { observe } from './observe';
import { deepEqual } from 'src/LSElement/utils/deepEqual';

const { STORAGE, STORAGE_LOCAL_CHANGE } = STORED_ATTRIBUTES_EVENTS;

export function storedAttribute<T>(key: string, defaultValue: T, storage: Storage = localStorage) {
  const listener = (storageEvent: StorageEvent | CustomEvent<StorageLocalChangeEventType>) => {
    //@ts-ignore
    const event: StorageLocalChangeEventType = storageEvent.detail ? storageEvent.detail : storageEvent;
    if (event.key === key) {
      const newValue = get();
      if (!deepEqual(proxiedObject.value, newValue)) {
        proxiedObject.value = newValue;
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
    const localStorageValue = storage.getItem(key);
    if (localStorageValue) {
      return JSON.parse(localStorageValue);
    }
    return defaultValue;
  };

  const proxiedObject = observe({ ...observableProps, value: get() || defaultValue }, () => {
    const newValue = proxiedObject.value;
    storage.setItem(key, newValue);
    window.dispatchEvent(new CustomEvent<StorageLocalChangeEventType>(STORAGE_LOCAL_CHANGE, { detail: { key, newValue } }));
  });

  return proxiedObject;
}