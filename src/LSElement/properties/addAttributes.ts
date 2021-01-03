import { LSCustomElement } from '../types';
import { setStandardAttribute } from '../utils/setStandardAttribute';
import { definePropertyFromStore } from './definePropertyFromStore';
import { formatToKebabCase } from '../utils/formatToKebabCase';

export function addAttributes(self: LSCustomElement) {
  self.lsStatic.attributes.concat(self.lsStatic.reflectedAttributes).forEach(propertyKey => {
    definePropertyFromStore(self, propertyKey);
    const standarizedAttributeName = formatToKebabCase(propertyKey);
    if (propertyKey !== standarizedAttributeName) {
      definePropertyFromStore(self, standarizedAttributeName, propertyKey);
    }
  });

  // Not standarized name
  const reflectedAttributes = self.lsStatic.reflectedAttributes;
  if (reflectedAttributes.length > 0) {
    self.ls.stateStore.subscribe((propertyKey, newValue) => {
      if (self.ls.alreadyRendered) {
        reflectedAttributes.forEach(reflectedPropertyKey => {
          if (reflectedPropertyKey === propertyKey) {
            setStandardAttribute(self, propertyKey, newValue);
          }
        });
      }
    });
  }
}