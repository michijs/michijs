import { AttributeManager } from '../../classes/AttributeManager';
import type { LSCustomElement } from '../../types';

export function attributeChangedCallback(self: LSCustomElement, name: string, oldValue, newValue) {
  if (newValue != oldValue) {
    self.componentWillReceiveAttribute?.(name, newValue, oldValue);
    self[name] = AttributeManager.getAttributeValue(newValue);
  }
}