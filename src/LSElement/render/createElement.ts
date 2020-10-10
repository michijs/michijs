import { ElementMap, LSNode } from '../types';
import { createTextNodeContent } from './createTextNodeContent';
import { isAnElementMap } from './isAnElementMap';
import { setAttribute } from './setAttribute';

export function createElement(elementMap: string | ElementMap, isSVGParam?: boolean) {
  let element: LSNode;
  if (isAnElementMap(elementMap)) {
    const isSVG = isSVGParam || elementMap.tag.toLowerCase() === 'svg';
    if (isSVG) {
      if (elementMap.attrs?.is) {
        element = document.createElementNS('http://www.w3.org/2000/svg', elementMap.tag, elementMap.attrs.is);
      } else {
        element = document.createElementNS('http://www.w3.org/2000/svg', elementMap.tag);
      }
    }
    else if (elementMap.attrs?.is) {
      element = document.createElement(elementMap.tag, elementMap.attrs.is);
    } else {
      element = document.createElement(elementMap.tag);
    }

    Object.keys(elementMap.attrs).forEach(name => {
      const value = elementMap.attrs[name];
      if (name.startsWith('on') && typeof value === 'function') {
        element.addEventListener(name.substr(2), value);
      } else {
        setAttribute(element as Element, name, value);
      }
    });
    if (!element.ls) {
      element.ls = {};
    }
    element.ls.attrsManagedByH = elementMap.attrs;
    elementMap.children.forEach(childElementMap => {
      element.appendChild(createElement(childElementMap, isSVG));
    });
  } else {
    element = document.createTextNode(createTextNodeContent(elementMap))
  }
  return element;
}