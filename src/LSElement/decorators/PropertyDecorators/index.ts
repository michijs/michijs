import type { Store, LSCustomElement, AttributeOptionsType, StoredAttributeOptionsType } from '../../types';
import { initLsStatic } from '../../properties/initLsStatic';
export { Child } from './Child';
export { EventDispatcher } from './EventDispatcher';

function addTargetAttribute(target: LSCustomElement, propertyKey: string, reflect: boolean) {
  if (reflect) {
    target.lsStatic.reflectedAttributes.push(propertyKey);
  } else {
    target.lsStatic.attributes.push(propertyKey);
  }
}

export function Attribute(options?: AttributeOptionsType): PropertyDecorator {
  return function (target: LSCustomElement, propertyKey: string) {
    target.lsStatic = initLsStatic(target.lsStatic);
    addTargetAttribute(target, propertyKey, options?.reflect);
  };
}

export function Store(store: Store<any>): PropertyDecorator {
  return function (target: LSCustomElement, propertyKey: string) {
    target.lsStatic = initLsStatic(target.lsStatic);
    if (store.subscribe && store.getState) {
      target.lsStatic.stores.push({ propertyKey, store });
    }
  };
}

export function StoredAttribute(storageOptions: StoredAttributeOptionsType): PropertyDecorator {
  return function (target: LSCustomElement, propertyKey: string) {
    target.lsStatic = initLsStatic(target.lsStatic);
    target.lsStatic.storedAttributes.push({ propertyKey, options: { key: storageOptions.key, method: storageOptions.method } });
    addTargetAttribute(target, propertyKey, storageOptions.reflect);
  };
}