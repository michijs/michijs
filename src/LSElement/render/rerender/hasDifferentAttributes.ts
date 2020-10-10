import { ElementMap, LSCustomElement } from '../../types';
import { deepEqual } from './deepEqual';

export function hasDifferentAttributes(newChildMap: ElementMap, element: LSCustomElement) {
  return !deepEqual(newChildMap.attrs, element.ls.attrsManagedByH);
}
