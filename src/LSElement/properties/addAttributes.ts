import { LSCustomElement } from '../types';
import { setStandardAttribute } from '../utils/setStandardAttribute';
import { standardizePropertyName } from './standardizePropertyName';
import { rerender } from '../render/rerender';
import { useStore } from '../hooks/useStore';

export function addAttributes(self: LSCustomElement) {
  const initialState: any = {};

  self.lsStatic.observedAttributes.forEach(attribute => {
    const attributeName = standardizePropertyName(attribute.propertyName);
    initialState[attribute.propertyName] = self[attributeName] || self[attribute.propertyName];
  });

  const [getState, setState] = useStore(initialState);

  self.lsStatic.observedAttributes.forEach(attribute => {
    const attributeName = standardizePropertyName(attribute.propertyName);
    delete self[attribute.propertyName];
    const definedProperty = {
      set(newValue) {
        const oldValue = getState()[attribute.propertyName];
        if (newValue != oldValue) {
          const payload = { [attribute.propertyName]: newValue };
          setState(payload);
          const onChange = attribute?.options?.onChange;
          if (onChange) {
            self[onChange](newValue, oldValue);
          }
          rerender(self);
          if (attribute.options?.reflect) {
            setStandardAttribute(self, attribute.propertyName, newValue);
          }
        }
      },
      get() {
        return getState()[attribute.propertyName];
      },
    };
    Object.defineProperty(self, attribute.propertyName, definedProperty);
    if (attribute.propertyName !== attributeName) {
      delete self[attributeName];
      Object.defineProperty(self, attributeName, definedProperty);
    }
    if (attribute.options?.reflect) {
      setStandardAttribute(self, attribute.propertyName, self[attribute.propertyName]);
    }
  });
}