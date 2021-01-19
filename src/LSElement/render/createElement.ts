import { ElementMapChild, LSCustomElement, LSNode } from '../types';
import { createTextNodeContent } from './createTextNodeContent';
import { insertNewChildren } from './insertNewChildren';
import { isAnElementMap } from '../typeWards/isAnElementMap';
import { setAttribute } from './setAttribute';
import { isAFunction } from '../typeWards/IsAFunction';

export function createElement<T = LSNode>(self: LSCustomElement | null, elementMap: ElementMapChild, isSVGParam?: boolean): T {
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

    if (elementMap.attrs) {
      Object.keys(elementMap.attrs).forEach(name => {
        const value = elementMap.attrs[name];
        if (isAFunction(value) && name.startsWith('on')) {
          if (self) {
            element.addEventListener(name.substr(2), (ev) => value.apply(self, [ev]));
          } else {
            element.addEventListener(name.substr(2), value);
          }
        } else {
          setAttribute(element as LSCustomElement, name, value);
        }
      });
    }
    element.ls = element.ls || {};
    element.ls.attrsManagedByH = elementMap.attrs || {};
    if (elementMap.children.length > 0) {
      insertNewChildren(self, element as Element, elementMap.children, isSVG);
    }
  } else {
    element = document.createTextNode(createTextNodeContent(elementMap));
  }
  return element as unknown as T;
}