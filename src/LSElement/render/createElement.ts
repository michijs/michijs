import { ElementMap, LSCustomElement } from '../types';
import { setAttribute } from './setAttribute';

export function createElement(elementMap: ElementMap, isSVGParam?: boolean) {
  let element: LSCustomElement;
  const isSVG = isSVGParam || elementMap.tag.toLowerCase() === 'svg';
  if (isSVG) {
    if (elementMap.attrs?.is) {
      //@ts-ignore
      element = document.createElementNS('http://www.w3.org/2000/svg', elementMap.tag, elementMap.attrs.is);
    } else {
      //@ts-ignore
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
      setAttribute(element, name, value);
    }
  });
  if (!element.ls) {
    element.ls = {};
  }
  element.ls.attrsManagedByH = elementMap.attrs;
  elementMap.children.forEach(childElementMap => {
    const newChild = typeof childElementMap === 'object' ? createElement(childElementMap, isSVG) : document.createTextNode(childElementMap.toString());

    element.appendChild(newChild);
  });

  return element;
}