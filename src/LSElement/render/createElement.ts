import { ElementMapChild, LSCustomElement, LSNode } from '../types';
import { createTextNodeContent } from './createTextNodeContent';
import { insertNewChildren } from './insertNewChildren';
import { isAnElementMap } from '../typeWards/isAnElementMap';
import { setAttributes } from './setAttributes';

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

    setAttributes(self, element as LSCustomElement, elementMap, false);
    if (elementMap.children.length > 0) {
      insertNewChildren(self, element as Element, elementMap.children, isSVG);
    }
  } else {
    element = document.createTextNode(createTextNodeContent(elementMap));
  }
  return element as unknown as T;
}