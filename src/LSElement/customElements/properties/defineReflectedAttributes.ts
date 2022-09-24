import { setAttributes } from '../../DOM/attributes/setAttributes';
import { lsStore } from '../../hooks';
import { LSCustomElement, ReflectedAttributesType } from '../../types';
import { formatToKebabCase } from '../../utils';
import { definePropertyFromStore } from './definePropertyFromStore';


export const defineReflectedAttributes = (self: LSCustomElement, reflectedAttributes: ReflectedAttributesType, store: ReturnType<typeof lsStore>) => {
  if (reflectedAttributes)
    for (const key in reflectedAttributes) {
      const standarizedAttributeName = formatToKebabCase(key);
      if (key !== standarizedAttributeName)
        definePropertyFromStore(self, standarizedAttributeName, store, key);
      store.subscribe((propertiesThatChanged) => {
        if (propertiesThatChanged.find(x => x.startsWith(key))) {
          const newAttributes = { [standarizedAttributeName]: store.state[key as string] };
          setAttributes(self, newAttributes, self);
        }
      });
    }
};