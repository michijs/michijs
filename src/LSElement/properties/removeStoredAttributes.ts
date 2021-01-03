import { LSCustomElement } from '../types';
import { STORED_ATTRIBUTES_EVENTS } from './constants';
const { STORAGE, STORAGE_LOCAL_CHANGE } = STORED_ATTRIBUTES_EVENTS;

export function removeStoredAttributes(self: LSCustomElement) {
  if (self.ls.windowEventListeners) {
    self.ls.windowEventListeners.forEach(windowEventListener => {
      window.removeEventListener(STORAGE, windowEventListener);
      window.removeEventListener(STORAGE_LOCAL_CHANGE, windowEventListener);
    });
  }
}