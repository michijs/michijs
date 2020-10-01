import type { LSCustomElement } from '../types';
import { getRootNode } from '../render/getRootNode';

export function addElementsReferences(self: LSCustomElement) {
  self.lsStatic.elements.forEach(element => {
    delete self[element.propertyName];
    Object.defineProperty(self, element.propertyName, {
      get() {
        return getRootNode(self).getElementById(element.id);
      },
    });
  });
}