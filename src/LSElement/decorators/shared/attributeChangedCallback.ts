import { LSCustomElement } from '../../types';
import { getAttributeValue } from '../../utils/getAttribute';

export function attributeChangedCallback(self: LSCustomElement, name: string, oldValue, newValue) {
  if (newValue != oldValue) {
    self.componentWillReceiveAttribute?.(name, newValue, oldValue);
    self[name] = getAttributeValue(newValue);
  }
}