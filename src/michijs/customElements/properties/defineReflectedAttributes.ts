import { setAttributes } from '../../DOM/attributes/setAttributes';
import { AnyObject, MichiCustomElement, ReflectedAttributesType, Store } from '../../types';
import { formatToKebabCase } from '../../utils';
import { definePropertyFromStore } from './definePropertyFromStore';


export const defineReflectedAttributes = (self: MichiCustomElement, store: Store<AnyObject, AnyObject>, reflectedAttributes?: ReflectedAttributesType) => {
  if (reflectedAttributes)
    for (const key in reflectedAttributes) {
      const standarizedAttributeName = formatToKebabCase(key);
      if (key !== standarizedAttributeName)
        definePropertyFromStore(self, standarizedAttributeName, store, key);
      store.subscribe((propertiesThatChanged) => {
        if (propertiesThatChanged?.find(x => x.startsWith(key))) {
          const newAttributes = { [standarizedAttributeName]: store.state[key as string] };
          setAttributes(self, newAttributes, self);
        }
      });
    }
};