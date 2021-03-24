import { ElementMap, LSCustomElement } from '../../types';
import { setAttribute } from '../setAttribute';
import { deepEqual } from '../../utils/deepEqual';
import { isAFunction } from '../../typeWards/IsAFunction';
import { getAttribute } from 'src/LSElement/utils/getAttribute';

export function updateAttributes(currentElement: LSCustomElement, newElementMap: ElementMap) {
  const attributesNames = newElementMap.attrs._dynamicAttributes || Object.keys(newElementMap.attrs);
  attributesNames.forEach(name => {
    if (!isAFunction(newElementMap.attrs[name]) && !name.startsWith('on')) {// Events don't change with jsx
      const newValue = newElementMap.attrs[name];
      const oldValue = getAttribute(currentElement, name);
      if (!deepEqual(newValue, oldValue)) {
        // TODO: remove only listened styles
        setAttribute(currentElement, name, newValue);
      }
    }
  });
}
