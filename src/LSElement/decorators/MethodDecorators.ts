import { initLsStatic } from '../properties/initLsStatic';
import type { LSCustomElement } from '../types';

export function Observer(observedProperty: string) {
  return function (target: LSCustomElement, propertyKey: string) {
    target.lsStatic = initLsStatic(target.lsStatic);
    target.lsStatic.observers.push({ observerName: propertyKey, observedProperty });
  };
}