import { LSCustomElement, StorageLocalChangeEventType, StoredAttributeType } from '../types';
import { STORED_ATTRIBUTES_EVENTS } from './constants';
const { STORAGE, STORAGE_LOCAL_CHANGE } = STORED_ATTRIBUTES_EVENTS;

function setValueFromLocalStorage(self: LSCustomElement, propertyKey: string, newStorageValue: any, defaultValue: any) {
  try {
    const parsedNewStorageValue = JSON.parse(newStorageValue);
    self[propertyKey] = parsedNewStorageValue !== null ? parsedNewStorageValue : defaultValue;
  } catch { }
}

function getEventListener(self: LSCustomElement, attribute: StoredAttributeType, defaultValue) {
  return (storageEvent: StorageEvent | CustomEvent<StorageLocalChangeEventType>) => {
    const key = attribute.options.key;
    //@ts-ignore
    const event: StorageLocalChangeEventType = storageEvent.detail ? storageEvent.detail : storageEvent;
    if (event.key === key) {
      setValueFromLocalStorage(self, attribute.propertyKey, event.newValue, defaultValue);
    }
  };
}

export function addStoredAttributes(self: LSCustomElement) {
  self.lsStatic.storedAttributes.forEach(attribute => {
    const defaultValue = self[attribute.propertyKey];
    const storageMethod = attribute.options.method === 'sessionStorage' ? sessionStorage : localStorage;

    const key = attribute.options.key;
    setValueFromLocalStorage(self, attribute.propertyKey, localStorage.getItem(key), defaultValue);

    const EventListener = getEventListener(self, attribute, defaultValue);

    window.addEventListener(STORAGE, EventListener);
    window.addEventListener(STORAGE_LOCAL_CHANGE, EventListener);

    self.ls.windowEventListeners = self.ls.windowEventListeners || [];
    self.ls.windowEventListeners.push(EventListener);

    self.ls.stateStore.subscribe((propertyKey, newValue) => {
      if (self.ls.alreadyRendered && propertyKey === attribute.propertyKey) {
        window.dispatchEvent(new CustomEvent<StorageLocalChangeEventType>(STORAGE_LOCAL_CHANGE, { detail: { key, newValue } }));
        storageMethod.setItem(key, JSON.stringify(newValue));
      }
    });
  });
}