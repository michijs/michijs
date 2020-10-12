import { ElementMap, LSCustomElement } from '../../types';
import { setAttribute } from '../setAttribute';
import { deepEqual } from './deepEqual';

export function updateAttributes(currentElement: LSCustomElement, newElementMap: ElementMap) {
  const attributesNames = Object.keys(newElementMap.attrs);

  attributesNames.forEach(name => {
    const newValue = newElementMap.attrs[name];
    const oldValue = currentElement.ls.attrsManagedByH[name];
    if (!name.startsWith('on') && !deepEqual(newValue, oldValue)) {
      if (name === 'style') {
        // TODO: remove only listened styles
        currentElement.removeAttribute('style');
      }
      setAttribute(currentElement, name, newValue);
    }
  });
  currentElement.ls.attrsManagedByH = newElementMap.attrs;
}
