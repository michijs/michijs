import { LSCustomElement } from '../../types';
import { definePropertyFromStore } from './definePropertyFromStore';

export function addAttribute(self: LSCustomElement, propertyKey: string) {
  self.ls.store.state[propertyKey] = self[propertyKey];
  definePropertyFromStore(self, propertyKey);
}