import { formatToKebabCase } from '../../utils/formatToKebabCase';
import { LSCustomElement } from '../../types';
import { getAttributeValue } from '../../utils/getAttribute';

export function attributeChangedCallback(self: LSCustomElement, name: string, oldValue, newValue) {
  if (newValue != oldValue && self.ls.alreadyRendered) {
    self.componentWillReceiveAttribute?.(name, newValue, oldValue);
    const propertyKey = self.lsStatic.reflectedAttributes.find(propertyKey => formatToKebabCase(propertyKey) === name);
    self[propertyKey] = getAttributeValue(newValue);
  }
}